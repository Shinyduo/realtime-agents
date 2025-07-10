import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!
});

// Use your specific index with host
export const pineconeIndex = pc.index('test', 'https://test-cic8u46.svc.aped-4627-b74a.pinecone.io');