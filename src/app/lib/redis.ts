import Redis from 'ioredis';

export const redis = new Redis('redis://default:wtCUtSvqjXuZYJROeJNfVVkResIIcReS@metro.proxy.rlwy.net:19246');

// Helper functions
export async function setSessionHistory(sessionId: string, history: any) {
  await redis.set(`session:${sessionId}:history`, JSON.stringify(history));
}

export async function getSessionHistory(sessionId: string) {
  const data = await redis.get(`session:${sessionId}:history`);
  return data ? JSON.parse(data) : [];
}