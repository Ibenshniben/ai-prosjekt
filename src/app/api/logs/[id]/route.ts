import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Using the correct Next.js App Router types
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const { message } = await request.json();
    const log = await prisma.logEntry.update({
      where: { id },
      data: { message },
    });
    return NextResponse.json(log);
  } catch (err) {
    console.error('Error updating log:', err);
    return NextResponse.json({ error: 'Error updating log' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    await prisma.logEntry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting log:', err);
    return NextResponse.json({ error: 'Error deleting log' }, { status: 500 });
  }
}