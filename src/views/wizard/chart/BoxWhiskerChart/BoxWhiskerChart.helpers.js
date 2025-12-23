import { bisect, extent, randomLcg, randomUniform } from 'd3'
import {
  BOX_TOP_OFFSET,
  KDE_BOTTOM_OFFSET,
  MARGIN_BOTTOM,
  MARGIN_LEFT,
  MARGIN_RIGHT,
  MARGIN_TOP,
  QUANTILE_CARD_WIDTH,
  ROW_HEIGHT,
  SPACE
} from './BoxWhiskerChart.constants'

export const DATA_TYPES = {
  ALL: 'all_funds_raw',
  FILTERED: 'filtered_funds'
}

export function processData(data) {
  const idAccessor = d => d.fund_id
  const selectedFundAccessor = d => d.selected_fund
  const comparedFundsAccessor = (d, type) => d.Winsorize[type]
  const statsAccessors = {
    min: d => d.min,
    q1: d => d.q1,
    q2: d => d.median,
    q3: d => d.q3,
    max: d => d.max
  }
  const kdeAccessors = {
    x: d => d.x,
    y: d => d.density
  }
  const metrics = [
    {
      key: 'irr',
      statsAccessor: (d, type) => d.Winsorize.IRR[type].statistics,
      kdeAccessor: (d, type) => d.Winsorize.IRR[type].kde,
      valueAccessor: d => d.net_irr
    },
    {
      key: 'tvpi',
      statsAccessor: (d, type) => d.Winsorize.Net_Multiple[type].statistics,
      kdeAccessor: (d, type) => d.Winsorize.Net_Multiple[type].kde,
      valueAccessor: d => d.net_multiple
    },
    {
      key: 'dpi',
      statsAccessor: (d, type) => d.Winsorize.DPI[type].statistics,
      kdeAccessor: (d, type) => d.Winsorize.DPI[type].kde,
      valueAccessor: d => d.dpi
    }
  ]
  return Array.from(Object.values(DATA_TYPES)).reduce((acc, type) => {
    acc[type] = metrics.reduce((acc, { key, statsAccessor, kdeAccessor, valueAccessor }) => {
      const id = idAccessor(selectedFundAccessor(data))
      const value = valueAccessor(selectedFundAccessor(data))

      const compared = comparedFundsAccessor(data, type).map(d => ({
        id: idAccessor(d),
        value: valueAccessor(d)
      }))

      const stats = statsAccessor(data, type)
      const min = statsAccessors.min(stats)
      const max = statsAccessors.max(stats)
      const q1 = statsAccessors.q1(stats)
      const q2 = statsAccessors.q2(stats)
      const q3 = statsAccessors.q3(stats)
      const r0 = min
      const r1 = max

      const quartiles = [q1, q2, q3]
      let quartile = bisect(quartiles, value) + 1
      // Reverse the quartile so that larger values have smaller quartiles
      quartile = 4 - quartile + 1

      const kde = kdeAccessor(data, type).map(d => [kdeAccessors.x(d), kdeAccessors.y(d)])

      acc[key] = {
        key,
        selected: {
          id,
          value
        },
        compared,
        quartile,
        box: {
          quartiles,
          range: [r0, r1]
        },
        kde
      }
      return acc
    }, {})
    return acc
  }, {})
}

export function getXTopDomainAll(data) {
  return extent([...data.irr.box.range, ...data.irr.compared.map(d => d.value)])
}

export function getXBottomDomainAll(data) {
  return extent([
    ...data.tvpi.box.range,
    ...data.tvpi.compared.map(d => d.value),
    ...data.dpi.box.range,
    ...data.dpi.compared.map(d => d.value)
  ])
}

export function getDimensions(width) {
  const height = ROW_HEIGHT * 3 + SPACE * 6 + 1

  const topFrame = {
    x: 0.5,
    y: 0.5,
    width: width - 1,
    height: ROW_HEIGHT + SPACE * 2
  }
  const bottomFrame = {
    x: 0.5,
    y: topFrame.y + topFrame.height + SPACE,
    width: width - 1,
    height: ROW_HEIGHT * 2 + SPACE * 3
  }

  const range = [0.5 + MARGIN_LEFT, width - 0.5 - MARGIN_RIGHT]
  const xTop = {
    top: topFrame.y + topFrame.height - SPACE - MARGIN_BOTTOM,
    tickSize: ROW_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM,
    range
  }
  const xBottom = {
    top: bottomFrame.y + bottomFrame.height - SPACE - MARGIN_BOTTOM,
    tickSize: ROW_HEIGHT * 2 + SPACE - MARGIN_TOP - MARGIN_BOTTOM,
    range
  }

  const left = width - 0.5 - SPACE - QUANTILE_CARD_WIDTH
  const irrTop = topFrame.y + SPACE
  const irr = {
    quartile: { top: irrTop, left },
    box: {
      top: irrTop + BOX_TOP_OFFSET
    },
    kde: {
      top: irrTop + KDE_BOTTOM_OFFSET
    }
  }
  const tvpiTop = bottomFrame.y + SPACE
  const tvpi = {
    quartile: { top: tvpiTop, left },
    box: {
      top: tvpiTop + BOX_TOP_OFFSET
    },
    kde: {
      top: tvpiTop + KDE_BOTTOM_OFFSET
    }
  }
  const dpiTop = bottomFrame.y + ROW_HEIGHT + SPACE * 2
  const dpi = {
    quartile: { top: dpiTop, left },
    box: {
      top: dpiTop + BOX_TOP_OFFSET
    },
    kde: {
      top: dpiTop + KDE_BOTTOM_OFFSET
    }
  }

  return { height, topFrame, bottomFrame, xTop, xBottom, irr, tvpi, dpi }
}

export function getBoxPathStrings({ x, height, range, quartiles }) {
  const rangePathString = `M${x(range[0])},${-height / 2} V${height / 2} M${x(range[0])},0 H${x(
    quartiles[0]
  )} M${x(quartiles[2])},0 H${x(range[1])} M${x(range[1])},${-height / 2} V${height / 2}`
  const quartilesPathString = `M${x(quartiles[0])},${-height / 2} H${x(quartiles[2])} V${
    height / 2
  } H${x(quartiles[0])} Z`
  const medianPathString = `M${x(quartiles[1])},${-height / 2} V${height / 2}`
  return {
    rangePathString,
    quartilesPathString,
    medianPathString
  }
}

export function jitterDots({ data, halfOffset, dimension = 'y', seed = 0 }) {
  const source = randomLcg(seed)
  const rand = randomUniform.source(source)(-halfOffset, halfOffset)
  return data.map(d =>
    Object.assign(
      {
        [dimension]: rand()
      },
      d
    )
  )
}
