import { NextRequest, NextResponse } from 'next/server';
import { pineconeIndex } from '../../lib/pinecone';
import { generateEmbedding } from '../../lib/embeddings';

export async function POST(request: NextRequest) {
  try {
    console.log('[search-vehicles] POST called');
    const { query } = await request.json();

    if (!query) {
      console.log('[search-vehicles] Missing query');
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log('[search-vehicles] Query:', query);

    const queryEmbedding = await generateEmbedding(query);

    const searchResponse = await pineconeIndex.query({
      vector: queryEmbedding,
      topK: 2,
      includeMetadata: true,
    });

    console.log('[search-vehicles] Pinecone response:', JSON.stringify(searchResponse));

    const vehicles = searchResponse.matches?.map(match => ({
      id: match.id,
      score: match.score,
      ...match.metadata
    })) || [];

    console.log('[search-vehicles] Vehicles:', vehicles);

    return NextResponse.json({ vehicles });

  } catch (error) {
    console.error('[search-vehicles] Error:', error);
    return NextResponse.json({ 
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

