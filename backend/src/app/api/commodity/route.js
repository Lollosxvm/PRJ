// backend/src/app/api/commodity/route.js
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol") || "WHEAT";
  const key = process.env.ALPHA_VANTAGE_KEY;
  const url =
    `https://www.alphavantage.co/query` +
    `?function=TIME_SERIES_DAILY&symbol=${symbol}` +
    `&apikey=${key}&datatype=json`;
  const resp = await fetch(url);
  const json = await resp.json();
  // estrae ultimi 30 giorni
  const series = Object.entries(json["Time Series (Daily)"] || {})
    .slice(0, 30)
    .map(([date, data]) => ({
      date,
      close: parseFloat(data["4. close"]),
    }));
  return new Response(JSON.stringify({ series }), {
    headers: { "Content-Type": "application/json" },
  });
}
