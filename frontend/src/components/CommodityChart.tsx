// frontend/src/components/CommodityChart.tsx
import { type FC } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Point {
  date: string;
  close: number;
}

interface CommodityChartProps {
  data: Point[];
  symbol: string;
}

export const CommodityChart: FC<CommodityChartProps> = ({ data, symbol }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">
        {symbol} – Prezzo giornaliero
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" tickFormatter={(d) => d.slice(5)} />
          <YAxis domain={["dataMin", "dataMax"]} />
          <Tooltip formatter={(value: unknown) => `${value} USD`} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="close"
            name="Chiusura"
            stroke="#2563EB"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
