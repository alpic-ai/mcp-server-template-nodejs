import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { type CallToolResult, type GetPromptResult, type ReadResourceResult } from "@modelcontextprotocol/sdk/types.js";

export const getServer = (): McpServer => {
  const server = new McpServer(
    {
      name: "mcp-server-template",
      version: "0.0.1",
    },
    {
      capabilities: {
        logging: {},
      },
    },
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

  server.tool(
    "greet",
    "A simple greeting tool",
    {
      name: z.string().describe("Name to greet"),
    },
    async ({ name }): Promise<CallToolResult> => {
      return {
        content: [
          {
            type: "text",
            text: `Hello, ${name}!`,
          },
        ],
      };
    },
  );

  server.tool(
    "send-notification",
    "Send a notification to the client",
    {
      message: z.string().describe("The notification message to send"),
      level: z
        .enum(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"])
        .optional()
        .default("info")
        .describe("The severity level of the notification"),
    },
    async ({ message, level }): Promise<CallToolResult> => {
      try {
        await server.server.sendLoggingMessage({
          level,
          data: message,
        });

        return {
          content: [
            {
              type: "text",
              text: `Notification sent successfully: [${level}] ${message}`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to send notification: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    },
  );

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
