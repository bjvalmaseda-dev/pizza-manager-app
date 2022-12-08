import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options: ChartOptions<'line'> = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    y: {
      title: {
        display: false,
        text: 'Month',
      },
      display: false,
    },
    x: {
      position: 'top',
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: { enabled: false },
    filler: {
      propagate: true,
    },
  },
}

const labels = ['January', 'February', 'March']

export const data: ChartData<'line'> = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      fill: true,
      tension: 0.4,
      borderColor: '#FAAF6B',
    },
  ],
}

export function LineChart() {
  return <Line options={options} data={data} />
}
