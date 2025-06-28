# 📝 Berkshire Hathaway RAG Agent with Mastra

This project implements a Retrieval-Augmented Generation (RAG) Agent using [Mastra](https://mastra.ai/) to analyze Warren Buffett's investment philosophy from Berkshire Hathaway shareholder letters.

The system uses:

✅ Mastra's Agent and Vector Store infrastructure
✅ OpenAI embeddings and GPT-4o for generation
✅ A CLI to interact with the agent
✅ PDF parsing to build the knowledge base

---

## 📂 Project Structure

```
soumyadeep423-rag-agent-mastra/
├── package.json
└── src/
    ├── server.ts            # CLI interface for chatting with the agent
    ├── store.ts             # Vector store ingestion for shareholder letters
    └── mastra/
        ├── index.ts         # Mastra setup with agents and vector store
        └── agents/
            └── rag-agent.ts # RAG Agent definition
```

---

## ⚙️ Installation & Setup

### 1. **System Requirements**

* [Node.js](https://nodejs.org/) ≥ 20.9.0
* [Bun](https://bun.sh/) if you want to run Bun-based scripts (optional)
* A running PostgreSQL database for `pgVector`
* OpenAI API Key (set via environment variable)

---

### 2. **Clone and Install**

```bash
git clone <repo-url>
cd soumyadeep423-rag-agent-mastra
npm install
```

---

### 3. **Environment Variables**

Create a `.env` file and set:

```bash
POSTGRES_CONNECTION_STRING=postgresql://username:password@localhost:5432/yourdb
OPENAI_API_KEY=
```

Ensure your PostgreSQL database is running and accessible.

---

### 4. **Ingest Shareholder Letters**

Place all PDF files of Berkshire Hathaway shareholder letters inside a `letters/` directory at the root.

Run the ingestion script:

```bash
bun src/store.ts
```

This will:

✅ Parse all PDFs
✅ Chunk and embed them using OpenAI
✅ Store them in the vector store via Mastra

---

### 5. **Start Mastra Development Server**

```bash
npm run dev
```

Mastra will start on [http://localhost:4111](http://localhost:4111) by default.

You can verify your agent at:

```
http://localhost:4111/api/agents
```

---

### 6. **Interact with the Agent via Playground**
Chat with the Agent through Mastra's Playground
```
http://localhost:4111/
```

---

## 🛠 Tech Stack

* Mastra Agents & Vector Store
* OpenAI Embeddings (`text-embedding-3-small`)
* OpenAI GPT-4o for generation
* PostgreSQL with pgVector for storage
* PDF parsing with `pdf-parse`
* TypeScript for type safety

---

## 🚀 Future Improvements

* Chat history integration for multi-turn conversations
* REST API or WebSocket-based frontend
* More sophisticated PDF processing
* Evaluation framework using Mastra's `/evals` endpoints

---

## 🧹 Troubleshooting

* Ensure `.env` variables are correctly set
* Make sure PostgreSQL and pgVector are running
* If PDFs fail to parse, check file format and permissions
* For Bun-specific errors, ensure you're using Bun v1.2.17+

