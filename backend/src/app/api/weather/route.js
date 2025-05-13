// backend/src/app/api/weather/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  // 1) Verifica che process.env legga la chiave
  console.log('OPENWEATHER_API_KEY =', process.env.OPENWEATHER_API_KEY);

  // Puoi anche provare subito a rispondere per test
  // return NextResponse.json({ ok: true, key: process.env.OPENWEATHER_API_KEY });

  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat') || '44.5';
    const lon = searchParams.get('lon') || '11.3';
    const key = process.env.OPENWEATHER_API_KEY;

    // 2) Costruisci l’URL per One Call 3.0
    const url = [
      'https://api.openweathermap.org/data/3.0/onecall',
      `lat=${lat}`,
      `lon=${lon}`,
      `appid=${key}`,
      `units=metric`,
      `exclude=minutely,daily,alerts`
    ].join('&').replace('https://api.openweathermap.org/data/3.0/onecall&','https://api.openweathermap.org/data/3.0/onecall?');

    const resp = await fetch(url);
    if (!resp.ok) {
      // Logga lo status e il corpo
      const text = await resp.text();
      console.error('Fetch error:', resp.status, text);
      return NextResponse.json({ error: `OpenWeather responded ${resp.status}` }, { status: 500 });
    }

    const data = await resp.json();
    const hourly = data.hourly.slice(0, 24).map(h => ({
      ts: h.dt,
      temp: h.temp,
      humidity: h.humidity
    }));

    return NextResponse.json({ hourly });
  } catch (err) {
    console.error('Handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
