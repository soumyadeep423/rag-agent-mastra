import readline from "readline";
import { MastraClient } from "@mastra/client-js";

const client = new MastraClient({
  baseUrl: "http://localhost:4111",
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function chatLoop() {
  const agent = client.getAgent("ragAgent"); // your agent ID

  console.log("=== Berkshire Hathaway RAG Chat CLI ===");
  console.log("Type your question, or 'exit' to quit.");

  while (true) {
    const body = await req.json() as { question: string };
    const question = body.question;
    if (question.trim().toLowerCase() === "exit") break;

    const response = await agent.stream({
      messages: [{ role: "user", content: question }],
    });

    console.log("AI:");
    response.processDataStream({
      onTextPart: text => process.stdout.write(text),
      onErrorPart: err => console.error("Stream error:", err),
    });
    console.log("\n");
  }

  rl.close();
  console.log("Goodbye!");
}

chatLoop().catch(console.error);
