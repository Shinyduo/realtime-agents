import { receptionAgent } from './reception';
import { serviceAgent } from './service';
import { salesAgent } from './sales';

// Cast to `any` to satisfy TypeScript until the core types make RealtimeAgent
// assignable to `Agent<unknown>` (current library versions are invariant on
// the context type).
(receptionAgent.handoffs as any).push(serviceAgent, salesAgent);
(serviceAgent.handoffs as any).push(receptionAgent, salesAgent);
(salesAgent.handoffs as any).push(receptionAgent, serviceAgent);
export const NextGearMotorsAgent = [
  receptionAgent,
  serviceAgent,
  salesAgent,
];

// Name of the company represented by this agent set. Used by guardrails
export const CompanyName = 'NextGear Motors';
