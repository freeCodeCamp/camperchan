import { stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import { describe, assert, it } from "vitest";
import { createLogFile } from "../../src/modules/createLogFile.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("createLogFile", () => {
  it("is defined", () => {
    assert.isDefined(createLogFile, "createLogFile is not defined");
    assert.isFunction(createLogFile, "createLogFile is not a function");
  });

  it("returns the expected data structure", async() => {
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
