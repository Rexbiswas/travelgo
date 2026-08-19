import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, destination, checkIn, checkOut, guests, price, customerName, customerEmail } = body;

    if (!title || !customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, message: 'Missing required booking details' },
        { status: 400 }
      );
    }

    const bookingId = `TG-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmation = {
      id: bookingId,
      title,
      destination: destination || 'Global',
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      guests: guests || 2,
      totalPriceINR: price || 12000,
      customerName,
      customerEmail,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      confirmationCode: `VOUCHER-${bookingId}`,
    };

    return NextResponse.json({
      success: true,
      message: 'Booking confirmed successfully!',
      data: confirmation,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request payload' },
      { status: 500 }
    );
  }
}
