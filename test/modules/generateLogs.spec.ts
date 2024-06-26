import { stat } from "fs/promises";
import { join } from "path";

import { describe, assert, test } from "vitest";

import { ExtendedClient } from "../../src/interfaces/ExtendedClient";
import { createLogFile } from "../../src/modules/createLogFile";
import { generateLogs } from "../../src/modules/generateLogs";

const mockBot = { privateLogs: {} } as ExtendedClient;

describe("generateLogs", () => {
  test("is defined", () => {
    assert.isDefined(generateLogs, "generateLogs is not defined");
    assert.isFunction(generateLogs, "generateLogs is not a function");
  });

  test("generates logs as expected", async () => {
    await createLogFile(mockBot, "Naomi");
    assert.property(mockBot.privateLogs, "Naomi", "Naomi is not defined");
    const attachment = await generateLogs(mockBot, "Naomi");
    assert.property(attachment, "name", "attachment is not defined");
    assert.property(attachment, "attachment", "attachment is not defined");
    const logPath = join(process.cwd(), "logs", "Naomi.txt");
    const status = await stat(logPath).catch(() => null);
    assert.isNull(status, "Log file was not deleted.");
  });
});
