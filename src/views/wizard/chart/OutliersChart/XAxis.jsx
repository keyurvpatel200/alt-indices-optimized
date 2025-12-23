import { memo } from 'react'

import styles from './OutliersChart.module.css'

const XAxis = ({ x, xTitle, xTickFormat, top, tickSize }) => {
  const [xRangeMin, xRangeMax] = x.range()
  const tickValues = x.ticks((xRangeMax - xRangeMin) / 80)

  return (
    <g className={ styles.axis } transform={ `translate(0,${ top })` }>
      { tickValues.map((d) => (
        <g key={ d } transform={ `translate(${ x(d) },0)` }>
          <line y2={ -tickSize } className={ d === 0 ? styles.isZero : '' }/>
          <text textAnchor="middle" dy="0.71em" y="8">
            { xTickFormat(d) }
          </text>
        </g>
      )) }
      <text className={ styles.axisTitle }
        textAnchor="middle"
        dy="0.71em"
        x={ (xRangeMin + xRangeMax) / 2 }
        y="32">
        { xTitle }
      </text>
    </g>
  )
}

export default memo(XAxis)