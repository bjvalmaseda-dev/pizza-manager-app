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

interface DataChart {
  labels: string[]
  data: number[]
}
interface Props {
  data: DataChart
}

export function LineChart({ data }: Props) {
  const dataToShow: ChartData<'line'> = {
    labels: data.labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data.data,
        fill: true,
        tension: 0.4,
        borderColor: '#FAAF6B',
      },
    ],
  }

  return <Line options={options} data={dataToShow} />
}
