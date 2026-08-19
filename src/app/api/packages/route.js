import { NextResponse } from 'next/server';
import { packagesData } from '@/data/travelData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();

  let results = [...packagesData];

  if (q) {
    results = results.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    timestamp: new Date().toISOString(),
    data: results,
  });
}
