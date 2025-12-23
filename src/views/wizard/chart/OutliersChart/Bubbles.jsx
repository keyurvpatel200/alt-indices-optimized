import { memo } from 'react'
import Bubble from './Bubble'

const Bubbles = ({ data, x, y, r, isOutlier }) => {
  return (
    <g>
      { data.map((d) => (
        <Bubble key={ d.id } data={ d } x={ x } y={ y } r={ r } isOutlier={ isOutlier }/>
      )) }
    </g>
  )
}

export default memo(Bubbles)