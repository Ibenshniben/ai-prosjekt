import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const logs = await prisma.logEntry.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
    
    // Format the timestamps
    const formattedLogs = logs.map(log => ({
      ...log,
      timestamp: new Date(log.timestamp).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }));
    
    return NextResponse.json(formattedLogs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Creating new log entry');
    const body = await request.json();
    console.log('Request body:', body);
    
    if (!body.message || typeof body.message !== 'string') {
      console.error('Invalid message format');
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    const log = await prisma.logEntry.create({
      data: {
        message: body.message,
      },
    });
    console.log('Log created:', log);
    
    // Format the timestamp
    const formattedLog = {
      ...log,
      timestamp: new Date(log.timestamp).toLocaleString('en-GB', {
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
    console.error('Error creating log:', err);
    return NextResponse.json({ error: 'Error creating log' }, { status: 500 });
  }
}