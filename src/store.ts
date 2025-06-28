import { openai } from "@ai-sdk/openai";
import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";
import { mastra } from "./mastra";
import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";

const lettersDir = "./letters";  // Directory containing all PDFs

const vectorStore = mastra.getVector("pgVector");

await vectorStore.createIndex({
  indexName: "letters",
  dimension: 1536,
});

const files = await fs.readdir(lettersDir);

for (const file of files) {
  if (path.extname(file).toLowerCase() !== ".pdf") continue;

  const filePath = path.join(lettersDir, file);
  const dataBuffer = await fs.readFile(filePath);

  const pdfData = await pdf(dataBuffer);
  const letterText = pdfData.text;

  const doc = MDocument.fromText(letterText);
  const chunks = await doc.chunk({
    strategy: "recursive",
    size: 512,
    overlap: 50,
    separator: "\n",
  });

  const { embeddings } = await embedMany({
    model: openai.embedding("text-embedding-3-small"),
    values: chunks.map((chunk) => chunk.text),
  });

  const yearMatch = file.match(/\d{4}/);
  const year = yearMatch ? yearMatch[0] : "Unknown";

  await vectorStore.upsert({
    indexName: "letters",
    vectors: embeddings,
    metadata: chunks.map((chunk) => ({
      text: chunk.text,
      year,
      source: `Berkshire Hathaway Shareholder Letter ${year}`,
    })),
  });

  console.log(`✅ Processed ${file} with ${chunks.length} chunks`);
}
