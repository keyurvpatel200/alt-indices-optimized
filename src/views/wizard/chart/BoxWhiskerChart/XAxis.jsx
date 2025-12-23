import { memo } from 'react'
import styles from './BoxWhiskerChart.module.css'

const XAxis = ({ x, xTickFormat, top, tickSize, tickValues }) => {
  return (
    <g className={ styles.axis } transform={ `translate(0,${top})` }>
      {tickValues.map(d => (
        <g key={ d } transform={ `translate(${x(d)},0)` }>
          <line y2={ -tickSize } className={ d === 0 ? styles.isZero : '' } />
          <text textAnchor="middle" dy="0.71em" y="8">
            {xTickFormat(d)}
          </text>
        </g>
      ))}
    </g>
  )
}

export default memo(XAxis)
