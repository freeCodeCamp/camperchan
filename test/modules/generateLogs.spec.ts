import { stat } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createLogFile } from "../../src/modules/createLogFile.js";
import { generateLogs } from "../../src/modules/generateLogs.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

const mockBot = { privateLogs: {} } as ExtendedClient;

describe("generateLogs", () => {
  it("is defined", () => {
    expect(generateLogs, "generateLogs is not defined").toBeDefined();
    expect(generateLogs, "generateLogs is not a function").toBeTypeOf("function");
  });

  it("generates logs as expected", async() => {
    await createLogFile(mockBot, "Naomi");
    expect(mockBot.privateLogs, "Naomi is not defined").toHaveProperty("Naomi");
    const attachment = await generateLogs(mockBot, "Naomi");
    expect(attachment, "attachment is not defined").toHaveProperty("name");
    expect(attachment, "attachment is not defined").toHaveProperty("attachment");
    const logPath = join(process.cwd(), "logs", "Naomi.txt");
    const status = await stat(logPath).catch(() => {
      return null;
    });
    expect(status, "Log file was not deleted.").toBeNull();
  });
});
