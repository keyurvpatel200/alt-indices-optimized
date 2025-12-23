import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'

import PieChart from '../../components/charts/Pie'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
  labels: ['Equity', 'Fixed Income', 'Alternatives', 'Case & Others'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

export default function Chart () {
  return (
    <>
      <div className="w-100">
        <div className="basic-detail pb-0 pr-0">
          <div className="">
            <PieChart/>
          </div>
        </div>
      </div>
    </>
  )
}