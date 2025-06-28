
import { Mastra } from '@mastra/core/mastra';
import { PgVector } from '@mastra/pg';
import { ragAgent } from './agents/rag-agent';

const pgVector = new PgVector({
  connectionString: process.env.POSTGRES_CONNECTION_STRING!,
});

export const mastra = new Mastra({
  agents: { ragAgent },
  vectors: { pgVector },
});
