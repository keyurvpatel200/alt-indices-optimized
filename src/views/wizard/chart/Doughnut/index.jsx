import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const DoughnutChart = ({
  quartile,
  maxQuartile,
  label,
  size = 128,
  activeColor = '#F47B59',
  inactiveColor = '#E5E7EB',
  thickness = 20,
  className = ''
}) => {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return

    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove()

    // Set up dimensions
    const width = size
    const height = size
    const radius = Math.min(width, height) / 2
    const innerRadius = radius - thickness

    // Create SVG and group
    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)

    const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`)

    // Create segments data
    const segments = Array.from({ length: maxQuartile }, (_, i) => ({
      index: i + 1,
      value: 1,
      isActive: i + 1 === quartile
    }))

    // Draw arcs
    segments.forEach((segment, i) => {
      const startAngle = (i * 2 * Math.PI) / maxQuartile
      const endAngle = ((i + 1) * 2 * Math.PI) / maxQuartile

      const arc = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(radius)
        .startAngle(startAngle)
        .endAngle(endAngle)
        // Increase padAngle to create more visible gaps between segments
        .padAngle(0.05)
        .cornerRadius(4)

      g.append('path')
        .attr('d', arc)
        .attr('fill', segment.isActive ? activeColor : inactiveColor)
    })
  }, [quartile, maxQuartile, size, activeColor, inactiveColor, thickness])

  return (
    <div className={ `flex flex-col items-center ${className}` }>
      <div className='relative' style={ { width: size, height: size } }>
        <svg ref={ svgRef }></svg>
        <div className='absolute inset-0 flex items-center justify-center'>
          <span className='text-lg font-semibold' style={ { color: activeColor } }>
            <span className='font-bold'>{quartile}</span>/{maxQuartile}
          </span>
        </div>
      </div>
      {!!label && (
        <div className='mt-6 bg-gray-900 text-red font-bold py-2 px-10 rounded text-center'>
          {label}
        </div>
      )}
    </div>
  )
}

export default DoughnutChart
