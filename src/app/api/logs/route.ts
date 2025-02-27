import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const logs = await prisma.logEntry.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    })
    return NextResponse.json(logs)
  } catch (err) {
    console.error('Error fetching logs:', err)
    return NextResponse.json({ error: 'Error fetching logs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    const log = await prisma.logEntry.create({
      data: {
        message,
      },
    })
    return NextResponse.json(log)
  } catch (err) {
    console.error('Error creating log:', err)
    return NextResponse.json({ error: 'Error creating log' }, { status: 500 })
  }
} 