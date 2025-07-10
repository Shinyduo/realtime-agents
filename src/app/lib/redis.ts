import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL as string); // or use host/port options

export default redis;

// Helper functions
export async function setSessionHistory(sessionId: string, history: any) {
  await redis.set(`session:${sessionId}:history`, JSON.stringify(history));
}

export async function getSessionHistory(sessionId: string) {
  const data = await redis.get(`session:${sessionId}:history`);
  return data ? JSON.parse(data) : [];
}