// frontend/src/components/KpiCard.tsx
import { type FC, type ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: ReactNode;
  unit?: string;
  delta?: number; // percentuale, es. +4.5 o -2.1
}

export const KpiCard: FC<KpiCardProps> = ({ title, value, unit, delta }) => {
  const isPositive = delta !== undefined && delta >= 0;
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {unit && <span className="ml-1 text-lg text-gray-500">{unit}</span>}
      </div>
      {delta !== undefined && (
        <span
          className={`mt-1 text-sm font-medium ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "▲" : "▼"} {Math.abs(delta)}%
        </span>
      )}
    </div>
  );
};
