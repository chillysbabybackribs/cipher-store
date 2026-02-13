import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const license = req.nextUrl.searchParams.get('license');

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify license key if provided
    if (license && order.licenseKey !== license) {
      return NextResponse.json(
        { error: 'Invalid license key' },
        { status: 401 }
      );
    }

    // Return order details (don't expose full details if no license provided)
    if (license && order.licenseKey === license) {
      return NextResponse.json({
        id: order.id,
        product: order.product,
        status: order.status,
        licenseKey: order.licenseKey,
        email: order.email,
        customerName: order.customerName,
      });
    }

    // Public info only (status check)
    return NextResponse.json({
      id: order.id,
      status: order.status,
    });
  } catch (error) {
    console.error('Order retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve order' },
      { status: 500 }
    );
  }
}
