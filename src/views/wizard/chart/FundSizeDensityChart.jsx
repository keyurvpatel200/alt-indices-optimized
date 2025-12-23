import { useId, useMemo } from 'react'
import { area, max, scaleLinear } from 'd3'
import useMeasure from 'react-use-measure'
import styles from './FundSizeDensityChart.module.css'

const minWidth = 600
const height = 400
const marginTop = 32
const marginRight = 24
const marginBottom = 44
const marginLeft = 16

const xTitle = 'Fund size (USD in millions)'

const xAccessor = (d) => d.fund_sizes_range
const yAccessor = (d) => d.kde_values

const xTickFormat = (d, append = '') => d.toString() + append
const percentageLabelFormat = (d) => d.toFixed(0) + '%'

const gradientStops = [
  { offset: 0, stopOpacity: 0.2 },
  { offset: 1, stopOpacity: 0.05 },
]

export default function FundSizeDensityChart ({
  fundThresholds,
  fundDistribution,
  comparedFund,
  selectedFundSizes,
  selectedPercentageType,
}) {
  const [ref, { width: elWidth }] = useMeasure()
  const width = Math.max(elWidth, minWidth)

  const id = useId()

  const xMin = fundThresholds[0]
  const xMax = fundThresholds[fundThresholds.length - 1]

  const x = useMemo(
    () =>
      scaleLinear()
        .domain([xMin, xMax])
        .range([marginLeft, width - marginRight]),
    [width, xMax, xMin],
  )

  const y = useMemo(
    () =>
      scaleLinear()
        .domain([0, max(comparedFund, yAccessor) * 1.05])
        .range([height - marginBottom, marginTop]),
    [comparedFund],
  )

  const areaGenerator = useMemo(
    () =>
      area()
        .x((d) => x(xAccessor(d)))
        .y0(y(0))
        .y1((d) => y(yAccessor(d))),
    [x, y],
  )

  const lineGenerator = useMemo(() => areaGenerator.lineY1(), [areaGenerator])

  return (
    <div ref={ ref } className={ styles.wrapper }>
      { width - marginLeft - marginRight > 0 ? (
        <svg className={ styles.svg } viewBox={ `0 0 ${ width } ${ height }` }>
          <defs>
            <linearGradient id={ `${ id }LinearGradient` } gradientTransform="rotate(90)">
              { gradientStops.map(({ offset, stopOpacity }) => (
                <stop key={ offset }
                  offset={ `${ offset * 100 }%` }
                  stopColor="currentColor"
                  stopOpacity={ stopOpacity }/>
              )) }
            </linearGradient>
          </defs>
          <g className={ styles.area }>
            <path fill={ `url(#${ id }LinearGradient)` } d={ areaGenerator(comparedFund) }/>
            <path fill="none" stroke="currentColor" d={ lineGenerator(comparedFund) }/>
          </g>
          <g className={ styles.slices }>
            { fundDistribution.map((d, i) => (
              <g key={ i }
                transform={ `translate(${ x(fundThresholds[i]) },${ marginTop })` }
                className={ `${ styles.slice } ${
                  selectedFundSizes.includes(i) ? styles.selected : ''
                }` }>
                <text textAnchor="middle"
                  y="-12"
                  x={ (x(fundThresholds[i + 1]) - x(fundThresholds[i])) / 2 }>
                  { percentageLabelFormat(d[selectedPercentageType]) }
                </text>
                <rect width={ x(fundThresholds[i + 1]) - x(fundThresholds[i]) }
                  height={ height - marginTop - marginBottom }/>
              </g>
            )) }
          </g>
          <g className={ styles.xAxis } transform={ `translate(0,${ height - marginBottom })` }>
            { fundThresholds.map((d) => (
              <g key={ d } transform={ `translate(${ x(d) },0)` }>
                <text textAnchor="middle" dy="0.71em" y="8">
                  { xTickFormat(d, d === xMax ? '+' : '') }
                </text>
                <line y1={ -height + marginTop + marginBottom }/>
              </g>
            )) }
            <text className={ styles.axisTitle }
              textAnchor="middle"
              dy="0.71em"
              x={ (marginLeft + width - marginRight) / 2 }
              y="28">
              { xTitle }
            </text>
          </g>
        </svg>
      ) : null }
    </div>
  )
}