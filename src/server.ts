import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type CallToolResult, type GetPromptResult, type ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "mcp-server-template",
      version: "0.0.1",
    },
    { capabilities: {} },
  );

  // Register a simple prompt
  server.prompt(
    "greeting-template",
    "A simple greeting prompt template",
    {
      name: z.string().describe("Name to include in greeting"),
    },
    async ({ name }): Promise<GetPromptResult> => {
      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please greet ${name} in a friendly manner.`,
            },
          },
        ],
      };
    },
  );

  server.tool("get-demo-night-startups", "Get demo night startups", {}, async (): Promise<CallToolResult> => {
    return {
      content: [
        {
          type: "text",
          text: `
🔥 Alpic - All-in-one MCP cloud
🔥 SigIQ.ai - Personalized AI tutors
🔥 Clikk - Smarter connections & follow-ups
🔥 rtrvr.ai - Web agents for browser & cloud
🔥 RoryPlans - Synthetic data for function calling
🔥 Shorts AI - AI video storytelling
🔥 Visum AI - Data center assistant
🔥 Camaral - Real-time AI avatars
🔥 Tabbird AI - Industrial workflow automation
🔥 Bob Interactive - Create your story!`,
        },
      ],
    };
  });

  server.resource(
    "greeting-resource",
    "https://example.com/greetings/default",
    { mimeType: "text/plain" },
    async (): Promise<ReadResourceResult> => {
      return {
        contents: [
          {
            uri: "https://example.com/greetings/default",
            text: "Hello, world!",
          },
        ],
      };
    },
  );

  return server;
};
