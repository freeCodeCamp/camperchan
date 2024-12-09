import { stat } from "node:fs/promises";
import { join } from "node:path";
import { describe, assert, it } from "vitest";
import { createLogFile } from "../../src/modules/createLogFile.js";
import { generateLogs } from "../../src/modules/generateLogs.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

const mockBot = { privateLogs: {} } as ExtendedClient;

describe("generateLogs", () => {
  it("is defined", () => {
    assert.isDefined(generateLogs, "generateLogs is not defined");
    assert.isFunction(generateLogs, "generateLogs is not a function");
  });

  it("generates logs as expected", async() => {
    await createLogFile(mockBot, "Naomi");
    assert.property(mockBot.privateLogs, "Naomi", "Naomi is not defined");
    const attachment = await generateLogs(mockBot, "Naomi");
    assert.property(attachment, "name", "attachment is not defined");
    assert.property(attachment, "attachment", "attachment is not defined");
    const logPath = join(process.cwd(), "logs", "Naomi.txt");
    const status = await stat(logPath).catch(() => {
      return null;
    });
    assert.isNull(status, "Log file was not deleted.");
  });
});
