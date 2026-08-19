import { NextResponse } from 'next/server';
import { destinationsData } from '@/data/travelData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const region = searchParams.get('region');

  let results = [...destinationsData];

  if (q) {
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }

  if (region && region !== 'all') {
    results = results.filter((d) => d.region.toLowerCase() === region.toLowerCase());
  }

  // Inject real-time timestamp and jitter to live travelers
  const realtimeResults = results.map((d) => ({
    ...d,
    activeTravelers: d.activeTravelers + Math.floor(Math.random() * 7) - 3,
    weather: {
      ...d.weather,
      temp: d.weather.temp + (Math.random() > 0.5 ? 1 : 0),
    },
  }));

  return NextResponse.json({
    success: true,
    total: realtimeResults.length,
    timestamp: new Date().toISOString(),
    data: realtimeResults,
  });
}
