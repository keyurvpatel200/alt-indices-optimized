import * as d3 from 'd3'
import React, { useEffect, useRef } from 'react'
import {
  calculateStats,
  kernelDensityEstimator,
  kernelEpanechnikov
} from './lib/kernelDensity'

const DensityBoxplot = ({
  data,
  margin: propMargin,
  highlightStart: propHighlightStart,
  highlightEnd: propHighlightEnd,
  highlightPercentage: propHighlightPercentage
}) => {
  const svgRef = useRef(null)
  const tooltipRef = useRef(null)

  // Using either provided dimensions or measured container dimensions
  const width = 400
  const height = 300
  const margin = propMargin || { top: 40, right: 80, bottom: 40, left: 40 }

  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom

  // Extract values for calculations
  const values = data.map((d) => d.value)

  // Calculate statistics
  const stats = calculateStats(values)

  // Use provided highlight range or calculate default (match 17% from image)
  const highlightStart = propHighlightStart || 0
  const highlightEnd = propHighlightEnd || 0

  // Calculate percentage in highlight range if not provided
  const highlightPercentage = propHighlightPercentage || 17
  useEffect(() => {
    if (!svgRef.current || !data.length || width === 0 || height === 0) return

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove()

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // X scale based on data range (match exact range in image: -15 to 50)
    const xMin = -15
    const xMax = 50

    const x = d3.scaleLinear().domain([xMin, xMax]).range([0, innerWidth])

    // Y scale for density
    const y = d3.scaleLinear().range([innerHeight, 0])

    // Calculate kernel density estimation
    const kde = kernelDensityEstimator(kernelEpanechnikov(2), x.ticks(500))
    const density = kde(values)

    // Find max density for y scale
    const maxDensity = d3.max(density, (d) => d.y) || 0
    y.domain([0, maxDensity * 1.05]) // Add 5% padding

    // Draw grid lines
    svg
      .append('g')
      .attr('class', 'grid')
      .selectAll('line')
      .data(x.ticks(13)) // Match grid in image (every 5 units)
      .enter()
      .append('line')
      .attr('x1', (d) => x(d))
      .attr('x2', (d) => x(d))
      .attr('y1', 0)
      .attr('y2', innerHeight)
      .attr('stroke', '#E5E7EB')
      .attr('stroke-width', 1)

    // Draw density plot outline (step-like as in the image)
    const densityLine = d3
      .line()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveStep)

    svg
      .append('path')
      .datum(density)
      .attr('fill', 'none')
      .attr('stroke', '#60A5FA')
      .attr('stroke-width', 1.5)
      .attr('d', densityLine)

    // Fill the density area
    const densityArea = d3
      .area()
      .x((d) => x(d.x))
      .y0(innerHeight)
      .y1((d) => y(d.y))
      .curve(d3.curveStep)

    svg
      .append('path')
      .datum(density)
      .attr('fill', '#93C5FD')
      .attr('fill-opacity', 0.5)
      .attr('d', densityArea)

    // Add highlighted area (17% in the image)
    // Filter density points within highlight range
    const highlightArea = density.filter((d) => d.x >= highlightStart && d.x <= highlightEnd)

    if (highlightArea.length > 0) {
      // Create a closed path for the highlighted area
      const areaHighlight = d3
        .area()
        .x((d) => x(d.x))
        .y0(innerHeight)
        .y1((d) => y(d.y))
        .curve(d3.curveStep)

      // Draw highlight area
      svg
        .append('path')
        .datum(highlightArea)
        .attr('fill', '#3B82F6')
        .attr('fill-opacity', 0.3)
        .attr('d', areaHighlight)

      // Add percentage label
      svg
        .append('text')
        .attr('x', x((highlightStart + highlightEnd) / 2))
        .attr('y', y(maxDensity * 0.6))
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('fill', '#000000')
        .text(`${highlightPercentage}%`)
    }

    // Draw boxplot elements
    const boxHeight = 8
    const boxY = innerHeight - boxHeight - 10

    // Draw box
    svg
      .append('rect')
      .attr('x', x(stats.q1))
      .attr('y', boxY)
      .attr('width', x(stats.q3) - x(stats.q1))
      .attr('height', boxHeight)
      .attr('stroke', '#000000')
      .attr('fill', '#FFFFFF')
      .attr('stroke-width', 1)

    // Add median line
    svg
      .append('line')
      .attr('x1', x(stats.median))
      .attr('x2', x(stats.median))
      .attr('y1', boxY)
      .attr('y2', boxY + boxHeight)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)

    // Add min/max vertical lines (whiskers)
    svg
      .append('line')
      .attr('x1', x(stats.min))
      .attr('x2', x(stats.min))
      .attr('y1', boxY + boxHeight / 4)
      .attr('y2', boxY + (boxHeight * 3) / 4)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)

    svg
      .append('line')
      .attr('x1', x(stats.max))
      .attr('x2', x(stats.max))
      .attr('y1', boxY + boxHeight / 4)
      .attr('y2', boxY + (boxHeight * 3) / 4)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)

    // Add whisker lines
    svg
      .append('line')
      .attr('x1', x(stats.min))
      .attr('x2', x(stats.q1))
      .attr('y1', boxY + boxHeight / 2)
      .attr('y2', boxY + boxHeight / 2)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)

    svg
      .append('line')
      .attr('x1', x(stats.q3))
      .attr('x2', x(stats.max))
      .attr('y1', boxY + boxHeight / 2)
      .attr('y2', boxY + boxHeight / 2)
      .attr('stroke', '#000000')
      .attr('stroke-width', 1)

    // Draw individual data points
    data.forEach((d, i) => {
      svg
        .append('circle')
        .attr('cx', x(d.value))
        .attr('cy', boxY + boxHeight / 2)
        .attr('r', 3.5)
        .attr('fill', d.highlighted ? '#F97316' : '#60A5FA')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 1)
        .attr('data-index', i)
        .style('cursor', 'pointer')
        .on('mouseover', function (event) {
          const tooltipContent = `Value: ${d.value.toFixed(2)}`

          if (tooltipRef.current) {
            // Position tooltip
            tooltipRef.current.style.opacity = '1'
            tooltipRef.current.style.left = `${event.pageX + 10}px`
            tooltipRef.current.style.top = `${event.pageY - 25}px`
            tooltipRef.current.textContent = tooltipContent
          }

          // Highlight the point
          d3.select(event.currentTarget).attr('r', 5).attr('stroke-width', 2)
        })
        .on('mouseout', function () {
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '0'
          }

          // Reset point style
          d3.select(event.currentTarget).attr('r', 3.5).attr('stroke-width', 1)
        })
    })

    // Add sample size label - match image position
    svg
      .append('text')
      .attr('x', innerWidth - 20)
      .attr('y', boxY + boxHeight / 2 + 5) // align with boxplot
      .attr('text-anchor', 'start')
      .style('font-size', '12px')
      .style('fill', '#000000')
      .text(`n=${data.length}`)

    // Get first and last data points
    const firstValue = d3.min(data, (d) => d.value)
    const lastValue = d3.max(data, (d) => d.value)

    // Draw vertical line for the first data point
    svg
      .append('line')
      .attr('x1', x(firstValue))
      .attr('x2', x(firstValue))
      .attr('y1', boxY - 10) // Above the boxplot
      .attr('y2', boxY + boxHeight / 2 + 10) // Extend below
      .attr('stroke', '#000000')
      .attr('stroke-width', 2)

    // Draw vertical line for the last data point
    svg
      .append('line')
      .attr('x1', x(lastValue))
      .attr('x2', x(lastValue))
      .attr('y1', boxY - 10) // Above the boxplot
      .attr('y2', boxY + boxHeight / 2 + 10) // Extend below
      .attr('stroke', '#000000')
      .attr('stroke-width', 2)

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).ticks(13).tickSize(-2)) // Match ticks with image
      .call((g) => g.select('.domain').attr('stroke-opacity', 0.7))
      .call((g) => g.selectAll('.tick line').attr('stroke-opacity', 0.7))
      .call((g) => g.selectAll('.tick text').attr('font-size', 10).attr('fill', '#000000'))
  }, [data, width, height])

  return (
    <div className='w-full h-full bg-white' style={ { position: 'relative' } }>
      <svg ref={ svgRef }></svg>
      <div
        ref={ tooltipRef }
        className='absolute bg-gray-800 text-white px-2 py-1 rounded text-xs pointer-events-none opacity-0 z-10'
        style={ { transition: 'opacity 0.15s ease' } }
      ></div>
    </div>
  )
}

export default DensityBoxplot
