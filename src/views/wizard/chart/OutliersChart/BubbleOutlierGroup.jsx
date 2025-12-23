import { memo, useCallback } from 'react'
import { pointer } from 'd3'

const BubbleOutlierGroup = ({ children, showTooltip, hideTooltip }) => {
  const handleMove = useCallback(
    (event) => {
      const d = event.target.closest('[data-id]')
      const id = d?.dataset.id
      if (id !== undefined) {
        const coords = pointer(event, event.target.ownerSVGElement)
        showTooltip({
          tooltipLeft: coords[0],
          tooltipTop: coords[1],
          tooltipData: +id,
        })
      } else {
        hideTooltip()
      }
    },
    [hideTooltip, showTooltip],
  )

  const handleLeave = useCallback(() => {
    hideTooltip()
  }, [hideTooltip])

  return (
    <g onMouseMove={ handleMove }
      onMouseLeave={ handleLeave }
      onTouchMove={ handleMove }
      onTouchEnd={ handleLeave }>
      { children }
    </g>
  )
}

export default memo(BubbleOutlierGroup)