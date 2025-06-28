import { MastraClient } from "@mastra/client-js";

const client = new MastraClient({
  baseUrl: "http://localhost:4111",
});

const agents = await client.getAgents();

const agent = client.getAgent("ragAgent");
const details = await agent.details();
