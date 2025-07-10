import { NextRequest, NextResponse } from 'next/server';
import { getSessionHistory, setSessionHistory } from '@/app/lib/redis';

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('sessionId');
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  const history = await getSessionHistory(sessionId);
  return NextResponse.json({ history });
}

export async function POST(request: NextRequest) {
  const { sessionId, history } = await request.json();
  if (!sessionId) return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  await setSessionHistory(sessionId, history);
  return NextResponse.json({ success: true });
}
