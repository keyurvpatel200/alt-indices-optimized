import { arc, pie } from 'd3'
import { memo } from 'react'
import { CORNER_RADIUS, ROW_HEIGHT, SPACE } from './BoxWhiskerChart.constants'
import styles from './BoxWhiskerChart.module.css'

const width = 120
const height = ROW_HEIGHT
const labelRectY = SPACE
const labelRectHeight = 20
const labelY = labelRectY + labelRectHeight / 2
const metricFrameWidth = 72
const metricFrameHeight = 20
const metricFrameY = height - SPACE / 2 - metricFrameHeight
const metricY = metricFrameY + metricFrameHeight / 2
const donutInnerRadius = 20
const donutOuterRadius = 32
const donutY = metricFrameY - SPACE / 2 - donutOuterRadius
const quartileValueFrameWidth = 24
const quartileValueFrameHeight = 16

const arcGenerator = arc().innerRadius(donutInnerRadius).outerRadius(donutOuterRadius)

const arcs = pie()
  .padAngle(0.1)
  .sort(null)
  .value(() => 1)([2, 3, 4, 1])

const QuartileChart = ({ left, top, metric, quartile }) => {
  return (
    <g transform={ `translate(${left + width / 2},${top})` }>
      <rect
        className={ styles.quartileFrame }
        rx={ CORNER_RADIUS }
        x={ -width / 2 }
        width={ width }
        height={ height }
      ></rect>
      <rect
        className={ styles.quartileLabelFrame }
        x={ -width / 2 }
        y={ labelRectY }
        width={ width }
        height={ labelRectHeight }
      ></rect>
      <text className={ styles.quartileLabel } textAnchor="middle" dy="0.32em" y={ labelY }>
        Quartile ranking
      </text>
      <rect
        className={ styles.quartileMetricFrame }
        rx={ CORNER_RADIUS }
        x={ -metricFrameWidth / 2 }
        y={ metricFrameY }
        width={ metricFrameWidth }
        height={ metricFrameHeight }
      />
      <text className={ styles.quartileMetric } textAnchor="middle" dy="0.32em" y={ metricY }>
        {metric }
      </text>
      <g transform={ `translate(0,${donutY})` }>
        <g>
          {arcs.map(a => (
            <path
              key={ a.data }
              className={ styles.quartileArc }
              data-active={ a.data === quartile ? '' : null }
              d={ arcGenerator(a) }
            />
          )) }
        </g>
        <rect
          className={ styles.quartileValueFrame }
          rx={ CORNER_RADIUS / 2 }
          x={ -quartileValueFrameWidth / 2 }
          y={ -quartileValueFrameHeight / 2 }
          width={ quartileValueFrameWidth }
          height={ quartileValueFrameHeight }
        />
        <text className={ styles.quartileValue } textAnchor="middle" dy="0.32em">
          {quartile}/4
        </text>
      </g>
    </g>
  )
}

export default memo(QuartileChart)
