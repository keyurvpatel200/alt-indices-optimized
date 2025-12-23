import { memo } from 'react'

import styles from './OutliersChart.module.css'

const Bubble = ({ data, x, y, r, isOutlier, isGhost }) => {
  return (
    <circle className={ [
      styles.bubble,
      isOutlier ? styles.isOutlier : '',
      isGhost ? styles.isGhost : '',
    ].join(' ') } data-id={ data.id } cx={ x(data.x) } cy={ y(data.y) } r={ r(data.r) }/>
  )
}

export default memo(Bubble)