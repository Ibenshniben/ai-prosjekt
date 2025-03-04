import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Context = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, context: Context) {
  try {
    const { message } = await request.json();
    const log = await prisma.logEntry.update({
      where: { id: context.params.id },
      data: { message },
    });
    return NextResponse.json(log);
  } catch (err) {
    return NextResponse.json({ error: 'Error updating log' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    await prisma.logEntry.delete({
      where: { id: context.params.id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Error deleting log' }, { status: 500 });
  }
}