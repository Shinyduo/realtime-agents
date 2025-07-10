import { salesAgent } from './NextGear/sales';
import { serviceAgent } from './NextGear/service';
import { receptionAgent } from './NextGear/reception';

import type { RealtimeAgent } from '@openai/agents/realtime';

// Map of scenario key -> array of RealtimeAgent objects
export const allAgentSets: Record<string, RealtimeAgent[]> = {
  nextgear: [receptionAgent, salesAgent, serviceAgent],
};

export const defaultAgentSetKey = 'nextgear';
