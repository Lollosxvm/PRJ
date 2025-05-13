// frontend/src/App.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchWeather } from "./features/weatherSlice";
import { fetchCommodity } from "./features/commoditySlice";
import { fetchSimulation } from "./features/simulationSlice";

import { KpiCard } from "./components/KpiCard";
import { WeatherChart } from "./components/WeatherChart";
import { CommodityChart } from "./components/CommodityChart";
import { SimulationControl } from "./components/SimulationControl";

export default function App() {
  const dispatch = useAppDispatch();
  const { hourly, status: wxStatus } = useAppSelector((s) => s.weather);
  const { series, status: cmdStatus } = useAppSelector((s) => s.commodity);
  const { points, status: simStatus } = useAppSelector((s) => s.simulation);

  useEffect(() => {
    dispatch(fetchWeather({ lat: 44.5, lon: 11.3 }));
    dispatch(fetchCommodity("MSFT"));
    dispatch(fetchSimulation());
  }, [dispatch]);

  // calcoli KPI
  const avgTemp = hourly.length
    ? hourly.reduce((s, h) => s + h.temp, 0) / hourly.length
    : 0;
  const latestPrice = series.length ? series[0].close : 0;
  const avgYield = points.length
    ? points.reduce((s, p) => s + p.yield, 0) / points.length
    : 0;

  return (
    <main className="max-w-screen-xl mx-auto p-6 space-y-12">
      {/* HEADER */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard Agricola</h1>
        <p className="text-gray-600">
          Benvenuto nella tua dashboard per il settore primario. Qui puoi
          monitorare le condizioni ambientali, valutare l’andamento dei mercati
          e simulare scenari produttivi per ottimizzare le tue decisioni.
        </p>
      </header>

      {/* KPI PRINCIPALI */}
      <section aria-labelledby="kpi-heading" className="space-y-4">
        <h2 id="kpi-heading" className="text-2xl font-semibold text-gray-700">
          KPI Principali
        </h2>
        <p className="text-gray-500">
          Queste tre metriche sintetizzano lo stato attuale:
          <ul className="list-disc pl-5 mt-2">
            <li>
              <strong>Temperatura Media (°C)</strong>: misura la temperatura
              oraria media, utile per prevedere stress termici sulle colture.
            </li>
            <li>
              <strong>Prezzo del Grano (USD)</strong>: prezzo di chiusura
              giornaliero sul mercato, fondamentale per decidere quando vendere
              o stoccare.
            </li>
            <li>
              <strong>Resa Media (t/ha)</strong>: stima della produzione per
              ettaro basata sui parametri simulati, indispensabile per
              pianificare raccolti e redditività.
            </li>
          </ul>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <KpiCard
            title="Temp. Media"
            value={
              wxStatus === "succeeded" ? (
                avgTemp.toFixed(1)
              ) : (
                <span className="animate-pulse bg-gray-200 rounded w-12 h-6 inline-block" />
              )
            }
            unit="°C"
          />
          <KpiCard
            title="Prezzo Grano"
            value={
              cmdStatus === "succeeded" ? (
                latestPrice.toFixed(2)
              ) : (
                <span className="animate-pulse bg-gray-200 rounded w-16 h-6 inline-block" />
              )
            }
            unit="USD"
          />
          <KpiCard
            title="Resa Media"
            value={
              simStatus === "succeeded" ? (
                avgYield.toFixed(2)
              ) : (
                <span className="animate-pulse bg-gray-200 rounded w-16 h-6 inline-block" />
              )
            }
            unit="t/ha"
          />
        </div>
      </section>

      {/* PREVISIONI ORARIE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Previsioni Orarie
        </h2>
        <p className="text-gray-500">
          Il grafico mostra:
          <ul className="list-disc pl-5 mt-2">
            <li>
              <span className="text-blue-500">Temperatura (°C)</span> — per
              pianificare irrigazioni e trattamenti.
            </li>
            <li>
              <span className="text-green-500">Umidità (%)</span> — per valutare
              il rischio di malattie e stress idrico.
            </li>
          </ul>
        </p>
        <div className="bg-white p-4 rounded-lg shadow">
          {wxStatus === "loading" ? (
            <div className="h-64 animate-pulse bg-gray-100" />
          ) : (
            <WeatherChart lat={44.5} lon={11.3} />
          )}
        </div>
      </section>

      {/* PREZZO COMMODITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Prezzo del Grano (ultimi 30 giorni)
        </h2>
        <p className="text-gray-500">
          Trend giornaliero del prezzo di chiusura: informazioni utili per
          ottimizzare il momento di vendita e massimizzare i ricavi.
        </p>
        <div className="bg-white p-4 rounded-lg shadow">
          {cmdStatus === "loading" ? (
            <div className="h-64 animate-pulse bg-gray-100" />
          ) : series.length > 0 ? (
            <CommodityChart data={series} symbol="WHEAT" />
          ) : (
            <p className="text-gray-500">Nessun dato disponibile</p>
          )}
        </div>
      </section>

      {/* SIMULAZIONE AMBIENTALE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Simulazione Ambientale
        </h2>
        <p className="text-gray-500">
          Genera dati sintetici di temperatura, umidità e resa: sperimenta
          diversi scenari per capire l’impatto delle condizioni meteo sulle tue
          colture.
        </p>
        <div className="bg-white p-4 rounded-lg shadow">
          <SimulationControl />
        </div>
      </section>
    </main>
  );
}
