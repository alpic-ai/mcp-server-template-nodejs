# Alpic MCP Template

A TypeScript template for building MCP servers using Streamable HTTP transport.

## Overview

This template provides a foundation for creating MCP servers that can communicate with AI assistants and other MCP clients. It includes a simple HTTP server implementation with example tools, resource & prompts to help you get started building your own MCP integrations.

## Prerequisites

- Node.js 22+ (see `.nvmrc` for exact version)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd mcp-server-template
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
cp .env.example .env
```

## Usage

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000` and automatically restart when you make changes to the source code.

### Production Build

Build the project for production:

```bash
npm run build
```

The compiled JavaScript will be output to the `dist/` directory.

### Running the Inspector

Use the MCP inspector tool to test your server:

```bash
npm run inspector
```

## API Endpoints

- `POST /mcp` - Main MCP communication endpoint
- `GET /mcp` - Returns "Method not allowed" (405)
- `DELETE /mcp` - Returns "Method not allowed" (405)

## Deploy

Use the following button to deploy the server to Alpic

[![Deploy on Alpic](https://assets.alpic.ai/button.svg)](https://app.alpic.ai/new/clone?repositoryUrl=https%3A%2F%2Fgithub.com%2Falpic-ai%2Fmcp-server-template-nodejs)

## Development

### Adding New Tools

To add a new tool, modify `src/server.ts`:

```typescript
server.tool(
  "tool-name",
  "Tool description",
  {
    // Define your parameters using Zod schemas
    param: z.string().describe("Parameter description"),
  },
  async ({ param }): Promise<CallToolResult> => {
    // Your tool implementation
    return {
      content: [
        {
          type: "text",
          text: `Result: ${param}`,
        },
      ],
    };
  },
);
```

### Adding New Prompts

To add a new prompt template, modify `src/server.ts`:

```typescript
server.prompt(
  "prompt-name",
  "Prompt description",
  {
    // Define your parameters using Zod schemas
    param: z.string().describe("Parameter description"),
  },
  async ({ param }): Promise<GetPromptResult> => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Your prompt content with ${param}`,
          },
        },
      ],
    };
  },
);
```

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Express.js Documentation](https://expressjs.com/)
