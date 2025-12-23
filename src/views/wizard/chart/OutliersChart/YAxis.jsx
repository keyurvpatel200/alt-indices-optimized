import { memo } from 'react'

import styles from './OutliersChart.module.css'

const YAxis = ({ y, yTitle, yTickFormat, left, tickSize }) => {
  const [yRangeMax, yRangeMin] = y.range()
  const tickValues = y.ticks((yRangeMax - yRangeMin) / 80)

  return (
    <g className={ styles.axis } transform={ `translate(${ left },0)` }>
      { tickValues.map((d) => (
        <g key={ d } transform={ `translate(0,${ y(d) })` }>
          <line x2={ tickSize } className={ d === 0 ? styles.isZero : '' }/>
          <text textAnchor="end" dy="0.32em" x="-8">
            { yTickFormat(d) }
          </text>
        </g>
      )) }
      <text className={ styles.axisTitle }
        textAnchor="middle"
        dy="0.71em"
        x={ -(yRangeMin + yRangeMax) / 2 }
        y="-52"
        transform="rotate(-90)">
        { yTitle }
      </text>
    </g>
  )
}

export default memo(YAxis)