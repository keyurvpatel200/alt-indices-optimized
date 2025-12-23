import { memo, useMemo } from 'react'

import styles from './OutliersChart.module.css'

const Contour = ({ data, x, y, color }) => {
  const points = useMemo(
    () => data.points.map((d) => [x(d.x), y(d.y)].join(',')).join(' '),
    [data.points, x, y],
  )
  return (
    <polyline className={ styles.contour }
      points={ points }
      stroke={ color(data.level) }
      fill={ color(data.level) }/>
  )
}

export default memo(Contour)