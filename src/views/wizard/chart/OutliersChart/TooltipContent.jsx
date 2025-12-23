import { memo } from 'react'
import { format } from 'd3'

const items = [
  {
    title: 'Size',
    accessor: (d) => d.fund_size,
    format: (d) => '$ ' + format(',')(d) + ' M',
  },
  {
    title: 'IRR',
    accessor: (d) => d.net_irr,
    format: (d) => format(',')(d) + '%',
  },
  {
    title: 'MOI',
    accessor: (d) => d.net_multiple,
    format: (d) => format(',')(d) + '×',
  },
]

const TooltipContent = ({ data }) => {
  return (
    <dl>
      { items.map((item) => (
        <div key={ item.title }>
          <dt>{ item.title }</dt>
          <dd>{ item.format(item.accessor(data)) }</dd>
        </div>
      )) }
    </dl>
  )
}

export default memo(TooltipContent)