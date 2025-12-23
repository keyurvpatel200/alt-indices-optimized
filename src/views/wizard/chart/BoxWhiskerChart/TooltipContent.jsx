import { memo } from 'react'
import { valueFormat } from './BoxWhiskerChart.utils'

const TooltipContent = ({ data }) => {
  const { metric, value } = data
  return (
    <dl>
      <div>
        <dt>{metric.toUpperCase()}</dt>
        <dd>{valueFormat[metric](value)}</dd>
      </div>
    </dl>
  )
}

export default memo(TooltipContent)
