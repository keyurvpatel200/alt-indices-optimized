import { memo } from 'react'
import Contour from './Contour'

const Contours = ({ data, x, y, color }) => {
  return (
    <g>
      { data.map((d) => (
        <Contour key={ d.level } data={ d } x={ x } y={ y } color={ color }/>
      )) }
    </g>
  )
}

export default memo(Contours)