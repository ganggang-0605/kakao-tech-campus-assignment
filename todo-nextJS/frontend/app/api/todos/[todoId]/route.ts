import { NextResponse } from 'next/server';
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:8000';

export async function PUT(request: Request, { params }: { params: Promise<{ todoId: string }> }) {
  const resolvedParams = await params;
  const body = await request.json();
  const res = await fetch(`${BACKEND_URL}/todos/${resolvedParams.todoId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}

export async function DELETE(request: Request, { params }: { params: Promise<{ todoId: string }> }) {
  const resolvedParams = await params;
  const res = await fetch(`${BACKEND_URL}/todos/${resolvedParams.todoId}`, { method: 'DELETE' });
  return NextResponse.json(await res.json());
}