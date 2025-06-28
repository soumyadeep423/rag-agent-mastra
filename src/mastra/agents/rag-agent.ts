import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { createVectorQueryTool } from "@mastra/rag";
import { LibSQLStore } from "@mastra/libsql";
import { Memory } from "@mastra/memory";

// Initialize memory with LibSQLStore for persistence
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../mastra.db",
  }),
});
 
const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  indexName: "letters",
  model: openai.embedding("text-embedding-3-small"),
});

export const ragAgent = new Agent({
    name:"rag-agent",
    instructions:`You are an intelligent AI agent that analyses Warren Buffett's investment philosophy using
                Berkshire Hathaway shareholder letters.
                Use the provided vector query tool to find relevant information from your knowledge base, 
                and provide accurate, well-supported answers based on the retrieved content.
                Also specify clearly which letter you have referred to generate the output `,
    model: openai("gpt-4o"),
    tools: {
        vectorQueryTool,
    },
    memory,
});

