import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { format, scaleSqrt } from 'd3'
import { TooltipWithBounds, useTooltip } from '@visx/tooltip'

import styles from './OutliersChart.module.css'
import {
  getContourColor,
  getScale,
  processContourData,
  processFundData,
} from './OutliersChart.helpers'
import BubbleOutlierGroup from './BubbleOutlierGroup'
import XAxis from './XAxis'
import YAxis from './YAxis'
import Bubbles from './Bubbles'
import Contours from './Contours'
import Bubble from './Bubble'
import TooltipContent from './TooltipContent'

const minWidth = 600
const height = 600
const marginTop = 8
const marginRight = 24
const marginBottom = 48
const marginLeft = 56
const boundedHeight = height - marginTop - marginBottom

const rDomainMin = 0
const rDomainMax = 1500
const rRangeMin = 2
const rRangeMax = 16

const xTitle = 'IRR'
const yTitle = 'MOI'

const xTickFormat = (d) => format(',.3~r')(d) + '%'
const yTickFormat = format(',.3~r')

const r = scaleSqrt()
  .domain([rDomainMin, rDomainMax])
  .range([rRangeMin, rRangeMax])
  .clamp(true)

export default function OutliersChart ({
  funds: rawFunds,
  outliers: rawOutliers,
  contours: rawContours,
  enableContour,
}) {
  const ref = useRef(null)
  const [contourColors, setContourColors] = useState()

  const [measureRef, { width: elWidth }] = useMeasure()
  const width = Math.max(elWidth, minWidth)
  const boundedWidth = width - marginLeft - marginRight

  const {
    tooltipData: tooltipId,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip()

  const funds = useMemo(() => processFundData(rawFunds), [rawFunds])
  const outliers = useMemo(() => processFundData(rawOutliers), [rawOutliers])
  const contours = useMemo(
    () => processContourData(rawContours),
    [rawContours],
  )

  const x = useMemo(
    () =>
      getScale({
        type: 'x',
        rangeExtent: [marginLeft, width - marginRight],
        funds,
        outliers,
        contours,
        r,
      }),
    [contours, funds, outliers, width],
  )

  const y = useMemo(
    () =>
      getScale({
        type: 'y',
        rangeExtent: [height - marginBottom, marginTop],
        funds,
        outliers,
        contours,
        r,
      }),
    [contours, funds, outliers],
  )

  const contourColor = useMemo(
    () => getContourColor({ contours, contourColors }),
    [contourColors, contours],
  )

  const tooltipData = useMemo(() => {
    if (!tooltipId) return undefined
    return [...funds, ...outliers].find((d) => d.id === tooltipId)
  }, [funds, outliers, tooltipId])

  const setRefs = useCallback(
    (node) => {
      ref.current = node
      measureRef(node)
    },
    [measureRef],
  )

  useEffect(() => {
    if (ref.current) {
      const styles = getComputedStyle(ref.current)
      setContourColors([
        styles.getPropertyValue('--color-contour-lowest-level'),
        styles.getPropertyValue('--color-contour-highest-level'),
      ])
    }
  }, [])

  return (
    <div ref={ setRefs } className={ styles.wrapper }>
      { elWidth > 0 && boundedWidth > 0 ? (
        <svg className={ styles.svg }
          width={ width }
          height={ height }
          viewBox={ `0 0 ${ width } ${ height }` }>
          <XAxis x={ x }
            xTitle={ xTitle }
            xTickFormat={ xTickFormat }
            top={ height - marginBottom }
            tickSize={ boundedHeight }/>
          <YAxis y={ y }
            yTitle={ yTitle }
            yTickFormat={ yTickFormat }
            left={ marginLeft }
            tickSize={ boundedWidth }/>
          <BubbleOutlierGroup showTooltip={ showTooltip } hideTooltip={ hideTooltip }>
            <Bubbles data={ funds } x={ x } y={ y } r={ r }/>
            <Bubbles data={ outliers } x={ x } y={ y } r={ r } isOutlier/>
            { tooltipData && (
              <Bubble data={ tooltipData } x={ x } y={ y } r={ r } isGhost/>
            ) }
          </BubbleOutlierGroup>
          { enableContour && (
            <Contours data={ contours } x={ x } y={ y } color={ contourColor }/>
          ) }
        </svg>
      ) : null }
      { tooltipOpen && tooltipData && (
        <TooltipWithBounds key={ Math.random() }
          className={ styles.tooltip }
          top={ tooltipTop }
          left={ tooltipLeft }
          offsetLeft={ 16 }
          offsetTop={ 16 }
          unstyled>
          <TooltipContent data={ tooltipData.data }/>
        </TooltipWithBounds>
      ) }
    </div>
  )
}