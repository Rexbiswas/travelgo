import { NextResponse } from 'next/server';
import { hotelsData } from '@/data/travelData';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  const destination = searchParams.get('destination')?.toLowerCase();
  const maxPrice = searchParams.get('maxPrice');
  const minRating = searchParams.get('minRating');
  const sortBy = searchParams.get('sortBy') || 'featured';

  let results = [...hotelsData];

  if (q) {
    results = results.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.location.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    );
  }

  if (destination && destination !== 'all') {
    results = results.filter((h) => h.destinationId === destination || h.location.toLowerCase().includes(destination));
  }

  if (maxPrice) {
    results = results.filter((h) => h.pricePerNight <= Number(maxPrice));
  }

  if (minRating) {
    results = results.filter((h) => h.rating >= Number(minRating));
  }

  if (sortBy === 'price_asc') {
    results.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (sortBy === 'price_desc') {
    results.sort((a, b) => b.pricePerNight - a.pricePerNight);
  } else if (sortBy === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    timestamp: new Date().toISOString(),
    data: results,
  });
}
