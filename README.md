Based on the provided code snippets, I'll help you write a README.md file for your repository. Here's a draft:

# **Elara Support Platform**

Elara is a state-of-the-art AI support platform that provides businesses with a smart support bot. Users can upload their own knowledge base to train the bot, allowing it to respond to customer inquiries 24/7.

## **Features**

- AI-Powered Support Bot trained on your custom knowledge base
- Document Ingestion from Word (.docx), PDF, and other formats
- Real-Time 24/7 Support to answer queries instantly
- Max Upload Limit: 10MB per document
- Multi-Language Ready (based on input)
- Secure Processing and Storage
- API Access for Developers

## **Getting Started**

1. Sign up for an Elara account
2. Upload your support documentation (PDF, Word, etc.)
3. Wait a few seconds while Elara indexes your content
4. Interact with your chatbot or embed it into your platform

## **Technology Stack**

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Drizzle ORM
- LangChain
- Azure OpenAI

## **Repository Structure**

- `src`: Source code for the Elara platform
  - `llm`: Large Language Model (LLM) related code
    - `utils`: Utility functions for text sanitization, document parsing, etc.
    - `prompts`: Chat prompt templates for the support bot
    - `chains`: Runnable sequences for the support bot
  - `db`: Database schema and utilities
  - `config`: Configuration files for the platform
- `migrations`: Database migration scripts
- `types`: Type definitions for the platform

Here's the updated section:

# **Setting Up the Project**

To get started with the Elara Support Platform, follow these steps:

### Prerequisites

- Node.js (version 14 or higher)
- TypeScript (version 4 or higher)
- Docker (for running PostgreSQL database locally)
- Azure OpenAI account (for language model integration)

### Step 1: Clone the Repository

Clone the Elara Support Platform repository using Git:

```bash
git clone https://github.com/your-username/elara-support-platform.git
```

### Step 2: Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### Step 3: Set up Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```makefile
PORT=3000
AZURE_OPENAI_ENDPOINT=https://your-azure-openai-endpoint.com
AZURE_OPENAI_API_KEY=your-azure-openai-api-key
AZURE_OPENAI_EMBEDDING_DEPLOYMENT=your-azure-openai-embedding-deployment
AZURE_OPENAI_DEPLOYMENT=your-azure-openai-deployment
OPENAI_API_VERSION=2022-12-01
DATABASE_URL=postgresql://elara:elara@localhost:5432/elara
```

Replace the placeholders with your actual Azure OpenAI credentials.

### Step 4: Run PostgreSQL Database using Docker Compose

To run the PostgreSQL database locally, use Docker Compose:

```bash
docker-compose up -d
```

This will start the PostgreSQL database in detached mode.

### Step 5: Apply Database Migrations

Apply the database migrations to set up the schema:

```bash
npx drizzle migrate
```

### Step 6: Start the Development Server

Start the development server using npm or yarn:

```bash
npm run dev
```

or

```bash
yarn dev
```

The server will start on port 3000, and you can access the Elara Support Platform at `http://localhost:3000`.

That's it! You should now have the Elara Support Platform up and running with a local PostgreSQL database.

**Note:** Make sure to stop the Docker container when you're done using the platform:

```bash
docker-compose down
```

## **Contributing**

Contributions are welcome! Please submit a pull request with a clear description of the changes.
