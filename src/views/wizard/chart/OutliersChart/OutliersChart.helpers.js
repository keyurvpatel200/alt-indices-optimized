import { ascending, descending, extent, interpolateLab, max, min, scaleLinear, zip } from 'd3'

export const processFundData = (data) => {
  const idAccessor = (d) => d.fund_id
  const xAccessor = (d) => d.net_irr
  const yAccessor = (d) => d.net_multiple
  const rAccessor = (d) => d.fund_size
  return data
    .filter(
      (d) =>
        ![xAccessor, yAccessor, rAccessor].some(
          (accessor) => accessor(d) === null,
        ),
    )
    .map((d) => ({
      id: idAccessor(d),
      x: xAccessor(d),
      y: yAccessor(d),
      r: rAccessor(d),
      data: d,
    }))
    .sort((a, b) => descending(a.r, b.r))
}

export const processContourData = (data) => {
  const levelAccessor = (d) => +d.level
  const xsAccessor = (d) => d.x
  const ysAccessor = (d) => d.y
  return data
    .map((d) => ({
      level: levelAccessor(d),
      points: zip(xsAccessor(d), ysAccessor(d)).map(([x, y]) => ({ x, y })),
    }))
    .sort((a, b) => descending(a.level, b.level))
}

export const getScale = ({
  type,
  rangeExtent,
  funds,
  outliers,
  contours,
  r,
}) => {
  const bubbles = [...funds, ...outliers]
  const points = contours.flatMap((d) => d.points)

  // First pass, not considering bubble sizes
  const [bubbleDomainMin, bubbleDomainMax] = extent(bubbles, (d) => d[type])
  const [contourDomainMin, contourDomainMax] = extent(points, (d) => d[type])
  const domainMin = Math.min(bubbleDomainMin, contourDomainMin)
  const domainMax = Math.max(bubbleDomainMax, contourDomainMax)
  const scale = scaleLinear().domain([domainMin, domainMax]).range(rangeExtent)

  // Second pass, adding extra padding for bubble sizes
  const bubbleRangeMin = min(bubbles, (d) => scale(d[type]) - r(d.r))
  const bubbleRangeMax = max(bubbles, (d) => scale(d[type]) + r(d.r))
  const [contourRangeMin, contourRangeMax] = extent(points, (d) =>
    scale(d[type]),
  )
  const rangeMin = Math.min(bubbleRangeMin, contourRangeMin)
  const rangeMax = Math.max(bubbleRangeMax, contourRangeMax)
  const domainExtent = [rangeMin, rangeMax].map(scale.invert).sort(ascending)
  scale.domain(domainExtent).nice()

  return scale
}

export const getContourColor = ({ contours, contourColors }) => {
  const lowestLevelColor = contourColors?.[0] ?? '#fff'
  const highestLevelColor = contourColors?.[1] ?? '#000'
  return scaleLinear()
    .domain(extent(contours, (d) => d.level))
    .range([lowestLevelColor, highestLevelColor])
    .interpolate(interpolateLab)
}