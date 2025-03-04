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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await prisma.logEntry.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error deleting log:', err);
    return NextResponse.json({ error: 'Error deleting log entry' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    
    const updatedLog = await prisma.logEntry.update({
      where: { id },
      data: {
        message: body.message,
      },
    });
    
    // Format the timestamp for response
    const formattedLog = {
      ...updatedLog,
      timestamp: new Date(updatedLog.timestamp).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
    
    return NextResponse.json(formattedLog);
  } catch (err) {
    console.error('Error updating log:', err);
    return NextResponse.json({ error: 'Error updating log entry' }, { status: 500 });
  }
}