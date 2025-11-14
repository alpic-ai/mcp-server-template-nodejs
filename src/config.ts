import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  MCP_HTTP_PORT: z.coerce.number().int().positive().default(3000),
  STARTUP_MODE: z.enum(["normal", "fail"]).default("normal"),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  if (process.stdout.isTTY) {
    console.error("❌ Invalid environment variables found:", parsedEnv.error.flatten().fieldErrors);
  }
  process.exit(1);
}

// Check if startup should fail (for testing purposes)
if (parsedEnv.data.STARTUP_MODE === "fail") {
  console.error("❌ Server startup failed: STARTUP_MODE is set to 'fail'");
  process.exit(1);
}

export const config = parsedEnv.data;
