import { area, curveStep, max, scaleLinear } from 'd3'
import { memo, useId, useMemo } from 'react'
import { KDE_HEIGHT } from './BoxWhiskerChart.constants'
import styles from './BoxWhiskerChart.module.css'

const gradientStops = [
  { offset: 0, stopOpacity: 1 },
  { offset: 1, stopOpacity: 0 }
]

const KDEChart = ({ top, x, kde }) => {
  const id = useId()

  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(kde, d => d[1])])
        .range([0, -KDE_HEIGHT]),
    [kde]
  )

  const areaGenerator = useMemo(
    () =>
      area()
        .x(d => x(d[0]))
        .y0(y(0))
        .y1(d => y(d[1]))
        .curve(curveStep),
    [x, y]
  )

  const lineGenerator = useMemo(() => areaGenerator.lineY1(), [areaGenerator])

  return (
    <g className={ styles.kde } transform={ `translate(0,${top})` }>
      <defs>
        <clipPath id={ `${id}ClipPath` }>
          <rect
            x={ x.range()[0] }
            y={ y.range()[1] - 1 }
            width={ x.range()[1] - x.range()[0] }
            height={ y.range()[0] - y.range()[1] + 2 }
          />
        </clipPath>
        <linearGradient id={ `${id}LinearGradient` } gradientTransform="rotate(90)">
          {gradientStops.map(({ offset, stopOpacity }) => (
            <stop key={ offset } offset={ `${offset * 100}%` } stopOpacity={ stopOpacity } />
          ))}
        </linearGradient>
      </defs>
      <g clipPath={ `url(#${id}ClipPath)` }>
        <path fill={ `url(#${id}LinearGradient)` } d={ areaGenerator(kde) } />
        <path className={ styles.kdeLine } d={ lineGenerator(kde) } />
      </g>
    </g>
  )
}

export default memo(KDEChart)
