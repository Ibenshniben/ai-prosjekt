import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { message } = await request.json()
    const log = await prisma.logEntry.update({
      where: { id: params.id },
      data: { message },
    })
    return NextResponse.json(log)
  } catch (err) {
    console.error('Error updating log:', err)
    return NextResponse.json({ error: 'Error updating log' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.logEntry.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Error deleting log:', err)
    return NextResponse.json({ error: 'Error deleting log' }, { status: 500 })
  }
}