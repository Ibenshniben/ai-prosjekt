import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    console.log('API: Fetching logs...');
    const logs = await prisma.logEntry.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
    console.log('API: Logs fetched successfully:', logs.length);
    
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
    console.error('API: Error fetching logs:', err);
    // Return empty array instead of error
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    const log = await prisma.logEntry.create({
      data: {
        message,
      },
    });
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