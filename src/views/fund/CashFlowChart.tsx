import React from 'react'
import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Register required Chart.js components
ChartJS.register(LineElement, LinearScale, PointElement, Tooltip, Legend, CategoryScale, Filler)

const CashFlowChart = ({ years, year_data }: { years: number[]; year_data: number[] }) => {
  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.9)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    return gradient
  }

  const data: any = {
    labels:
      years?.length > 0
        ? years
        : ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
    datasets: [
      {
        label: 'Strategy',
        data: year_data?.length > 0 ? year_data : [10, 20, 30, 40, 50, 60, 70, 80, 90],
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return null
          return getGradient(ctx, chartArea)
        },
        borderColor: '#1D2939',
        borderWidth: 2,
        stepped: 'middle',
        pointRadius: 0,
        tension: 0
      }
    ]
  }

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category'
      },
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      }
    }
  }

  return (
    <div style={ { width: '100%', height: '300px' } }>
      <Line data={ data } options={ options } />
    </div>
  )
}

export default CashFlowChart
