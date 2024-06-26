import { stat, unlink } from "fs/promises";
import { join } from "path";

import { describe, assert, test } from "vitest";

import { ExtendedClient } from "../../src/interfaces/ExtendedClient.js";
import { createLogFile } from "../../src/modules/createLogFile.js";

describe("createLogFile", () => {
  test("is defined", () => {
    assert.isDefined(createLogFile, "createLogFile is not defined");
    assert.isFunction(createLogFile, "createLogFile is not a function");
  });

  test("returns the expected data structure", async () => {
    const mockBot = { privateLogs: {} } as ExtendedClient;
    await createLogFile(mockBot, "Naomi");
    assert.property(mockBot.privateLogs, "Naomi", "Naomi is not defined");
    assert.equal(mockBot.privateLogs.Naomi, "Naomi", "Naomi is not Naomi");
    const logPath = join(process.cwd(), "logs", "Naomi.txt");
    const status = await stat(logPath);
    assert.isTrue(status.isFile(), "Naomi.txt is not a file");
    await unlink(logPath);
  });
});
