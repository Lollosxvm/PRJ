// frontend/src/components/SimulationControl.tsx
import React, { type FC, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchSimulation } from "../features/simulationSlice";

export const SimulationControl: FC = () => {
  const dispatch = useAppDispatch();
  const [running, setRunning] = useState(false);
  const [intervalMs, setIntervalMs] = useState(5000);

  React.useEffect(() => {
    let timer: number;
    if (running) {
      dispatch(fetchSimulation()); // fetch iniziale
      timer = setInterval(() => {
        dispatch(fetchSimulation());
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [running, intervalMs, dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <h2 className="text-xl font-semibold">Simulazione ambientale</h2>
      <div className="flex items-center space-x-2">
        <label>Intervallo (ms):</label>
        <input
          type="number"
          className="border px-2 py-1 rounded w-24"
          value={intervalMs}
          onChange={(e) => setIntervalMs(+e.target.value)}
        />
      </div>
      <button
        className={`px-4 py-2 rounded ${
          running ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
        onClick={() => setRunning((r) => !r)}
      >
        {running ? "Pausa" : "Play"}
      </button>
    </div>
  );
};
