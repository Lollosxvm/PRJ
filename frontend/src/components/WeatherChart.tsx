// frontend/src/components/WeatherChart.tsx
import { useEffect, useState, type FC } from 'react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts'

// tipizzazione dei singoli punti orari
interface HourlyPoint {
  ts: number
  temp: number
  humidity: number
}

// ciò che passerai da App.tsx
interface WeatherChartProps {
  lat?: number
  lon?: number
}

export const WeatherChart: FC<WeatherChartProps> = ({
  lat = 44.5,
  lon = 11.3,
}) => {
  const [data, setData] = useState<
    { hour: string; temp: number; humidity: number }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`)
        return res.json()
      })
      .then(({ hourly }: { hourly: HourlyPoint[] }) => {
        const parsed = hourly.map((h) => ({
          hour: new Date(h.ts * 1000).getHours() + ':00',
          temp: h.temp,
          humidity: h.humidity,
        }))
        setData(parsed)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [lat, lon])

  if (loading) return <div>Loading weather…</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Previsioni orarie</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="hour" />
          <YAxis yAxisId="left" domain={['auto', 'auto']} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            name="Temp (°C)"
            stroke="#4F46E5"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            name="Umidità (%)"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
