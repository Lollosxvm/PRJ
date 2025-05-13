// backend/src/app/api/simulation/route.js
export async function GET() {
  const points = Array.from({ length: 24 }).map((_, i) => ({
    hour: i + ":00",
    temp: +(15 + Math.random() * 10).toFixed(1),
    humidity: +(40 + Math.random() * 40).toFixed(0),
    yield: +(2 + Math.random() * 2).toFixed(2),
  }));
  return new Response(JSON.stringify({ points }), {
    headers: { "Content-Type": "application/json" },
  });
}
