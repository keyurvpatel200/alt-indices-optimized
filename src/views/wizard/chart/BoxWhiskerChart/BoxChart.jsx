import { memo, useCallback, useMemo } from 'react'
import styles from './BoxWhiskerChart.module.css'
import { getBoxPathStrings, jitterDots } from './BoxWhiskerChart.helpers'
import { format, max, pointer } from 'd3'

const height = 24
const dotRadius = 4
const selectedDotRadius = 8

const checkPathString =
  'm4.0238-2.8237c.2344.2344.2344.615 0 .8494l-4.8 4.8c-.2344.2344-.615.2344-.8494 0l-2.4-2.4c-.2344-.2344-.2344-.615 0-.8494s.615-.2344.8494 0l1.9762 1.9744 4.3762-4.3744c.2344-.2344.615-.2344.8494 0z'

const formatCount = format(',d')

const BoxChart = ({
  top,
  x,
  box,
  selected,
  compared,
  medianFormat,
  metric,
  showTooltip,
  hideTooltip
}) => {
  const { range, quartiles } = box

  const { rangePathString, quartilesPathString, medianPathString } = useMemo(
    () => getBoxPathStrings({ x, height, range, quartiles }),
    [quartiles, range, x]
  )

  const boundedMaxValue = useMemo(
    () =>
      Math.min(
        Math.max(
          max(
            compared.filter(d => d.value <= x.domain()[1]),
            d => d.value
          ),
          range[1]
        ),
        x.domain()[1]
      ),
    [compared, range, x]
  )

  const jitteredDots = useMemo(
    () => jitterDots({ data: compared, halfOffset: height / 2 - dotRadius }),
    [compared]
  )

  const visibleDots = useMemo(
    () => jitteredDots.filter(d => d.value >= x.domain()[0] && d.value <= x.domain()[1]),
    [jitteredDots, x]
  )

  const handleMove = useCallback(
    event => {
      const coords = pointer(event, event.target.ownerSVGElement.parentNode)
      showTooltip({
        tooltipLeft: coords[0],
        tooltipTop: coords[1],
        tooltipData: metric
      })
    },
    [metric, showTooltip]
  )

  const handleLeave = useCallback(() => {
    hideTooltip()
  }, [hideTooltip])

  return (
    <g className={ styles.box } transform={ `translate(0,${top})` }>
      <path d={ rangePathString } />
      <path d={ quartilesPathString } />
      <path d={ medianPathString } />
      <g className={ styles.dots }>
        {visibleDots.map(d => (
          <circle key={ [d.id, d.value].join('|') } r={ dotRadius } cx={ x(d.value) } cy={ d.y } />
        ))}
      </g>
      <text textAnchor="middle" x={ x(quartiles[1]) } y={ -height / 2 - 8 }>
        {medianFormat(quartiles[1])}
      </text>
      <text dy="0.32em" x={ x(boundedMaxValue) + 16 }>
        n={ formatCount(compared.length)}
      </text>
      <g
        className={ styles.selectedDot }
        transform={ `translate(${x(selected.value)},0)` }
        onMouseEnter={ handleMove }
        onMouseMove={ handleMove }
        onMouseLeave={ handleLeave }
        onTouchStart={ handleMove }
        onTouchMove={ handleMove }
        onTouchEnd={ handleLeave }
      >
        <circle r={ selectedDotRadius } />
        <path d={ checkPathString } />
      </g>
    </g>
  )
}

export default memo(BoxChart)
