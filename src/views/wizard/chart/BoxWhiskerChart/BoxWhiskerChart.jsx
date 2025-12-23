import { TooltipWithBounds, useTooltip } from '@visx/tooltip'
import { scaleLinear } from 'd3'
import { useMemo } from 'react'
import useMeasure from 'react-use-measure'
import BoxChart from './BoxChart'
import {
  X_BOTTOM_DOMAIN_FILTERED,
  X_TICK_GAP,
  X_TOP_DOMAIN_FILTERED
} from './BoxWhiskerChart.constants'
import {
  DATA_TYPES,
  getDimensions,
  getXBottomDomainAll,
  getXTopDomainAll,
  processData
} from './BoxWhiskerChart.helpers'
import styles from './BoxWhiskerChart.module.css'
import { tickFormat, valueFormat } from './BoxWhiskerChart.utils'
import Frame from './Frame'
import KDEChart from './KDEChart'
import QuartileChart from './QuartileChart'
import TooltipContent from './TooltipContent'
import XAxis from './XAxis'

const minWidth = 320

const BoxWhiskerChart = ({
  data: rawData,
  includeOutliers,
  theme = 'light' // light | dark
}) => {
  const [measureRef, { width: elWidth }] = useMeasure()
  const width = Math.max(elWidth, minWidth)
  const dims = useMemo(() => getDimensions(width), [width])

  const {
    tooltipData: tooltipMetric,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip
  } = useTooltip()

  const dataByType = useMemo(() => processData(rawData), [rawData])

  const data = dataByType[includeOutliers ? DATA_TYPES.ALL : DATA_TYPES.FILTERED]

  const xTopDomainAll = useMemo(() => getXTopDomainAll(dataByType[DATA_TYPES.ALL]), [dataByType])

  const xTop = useMemo(
    () =>
      scaleLinear()
        .domain(includeOutliers ? xTopDomainAll : X_TOP_DOMAIN_FILTERED)
        .range(dims.xTop.range),
    [dims.xTop.range, includeOutliers, xTopDomainAll]
  )

  const xTopTickValues = useMemo(
    () => xTop.ticks((dims.xTop.range[1] - dims.xTop.range[0]) / X_TICK_GAP),
    [dims.xTop.range, xTop]
  )

  const xBottomDomainAll = useMemo(
    () => getXBottomDomainAll(dataByType[DATA_TYPES.ALL]),
    [dataByType]
  )

  const xBottom = useMemo(
    () =>
      scaleLinear()
        .domain(includeOutliers ? xBottomDomainAll : X_BOTTOM_DOMAIN_FILTERED)
        .range(dims.xBottom.range),
    [dims.xBottom.range, includeOutliers, xBottomDomainAll]
  )

  const xBottomTickValues = useMemo(
    () => xBottom.ticks((dims.xBottom.range[1] - dims.xBottom.range[0]) / X_TICK_GAP),
    [dims.xBottom.range, xBottom]
  )

  const tooltipData = useMemo(() => {
    if (!tooltipMetric) return undefined
    return {
      metric: tooltipMetric,
      value: data[tooltipMetric].selected.value
    }
  }, [data, tooltipMetric])

  return (
    <div ref={ measureRef } className={ styles.wrapper } data-theme={ theme }>
      {elWidth > 0 ? (
        <svg
          className={ styles.svg }
          width={ width }
          height={ dims.height }
          viewBox={ `0 0 ${width } ${dims.height }` }
        >
          <Frame
            x={ dims.topFrame.x }
            y={ dims.topFrame.y }
            width={ dims.topFrame.width }
            height={ dims.topFrame.height }
          />
          <QuartileChart
            left={ dims.irr.quartile.left }
            top={ dims.irr.quartile.top }
            metric={ 'IRR' }
            quartile={ data.irr.quartile }
          />
          <XAxis
            x={ xTop }
            top={ dims.xTop.top }
            tickSize={ dims.xTop.tickSize }
            xTickFormat={ tickFormat.top }
            tickValues={ xTopTickValues }
          />
          <KDEChart top={ dims.irr.kde.top } x={ xTop } kde={ data.irr.kde } />
          <BoxChart
            top={ dims.irr.box.top }
            x={ xTop }
            box={ data.irr.box }
            selected={ data.irr.selected }
            compared={ data.irr.compared }
            medianFormat={ valueFormat.irr }
            metric="irr"
            showTooltip={ showTooltip }
            hideTooltip={ hideTooltip }
          />

          <Frame
            x={ dims.bottomFrame.x }
            y={ dims.bottomFrame.y }
            width={ dims.bottomFrame.width }
            height={ dims.bottomFrame.height }
          />
          <QuartileChart
            left={ dims.tvpi.quartile.left }
            top={ dims.tvpi.quartile.top }
            metric={ 'TVPI' }
            quartile={ data.tvpi.quartile }
          />
          <QuartileChart
            left={ dims.dpi.quartile.left }
            top={ dims.dpi.quartile.top }
            metric={ 'DPI' }
            quartile={ data.dpi.quartile }
          />
          <XAxis
            x={ xBottom }
            top={ dims.xBottom.top }
            tickSize={ dims.xBottom.tickSize }
            xTickFormat={ tickFormat.bottom }
            tickValues={ xBottomTickValues }
          />
          <KDEChart top={ dims.tvpi.kde.top } x={ xBottom } kde={ data.tvpi.kde } />
          <KDEChart top={ dims.dpi.kde.top } x={ xBottom } kde={ data.dpi.kde } />
          <BoxChart
            top={ dims.tvpi.box.top }
            x={ xBottom }
            box={ data.tvpi.box }
            selected={ data.tvpi.selected }
            compared={ data.tvpi.compared }
            medianFormat={ valueFormat.tvpi }
            metric="tvpi"
            showTooltip={ showTooltip }
            hideTooltip={ hideTooltip }
          />
          <BoxChart
            top={ dims.dpi.box.top }
            x={ xBottom }
            box={ data.dpi.box }
            selected={ data.dpi.selected }
            compared={ data.dpi.compared }
            medianFormat={ valueFormat.dpi }
            metric="dpi"
            showTooltip={ showTooltip }
            hideTooltip={ hideTooltip }
          />
        </svg>
      ) : null }
      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          key={ Math.random() }
          className={ styles.tooltip }
          top={ tooltipTop }
          left={ tooltipLeft }
          offsetLeft={ 16 }
          offsetTop={ 16 }
          unstyled
        >
          <TooltipContent data={ tooltipData } />
        </TooltipWithBounds>
      )}
    </div>
  )
}

export default BoxWhiskerChart
