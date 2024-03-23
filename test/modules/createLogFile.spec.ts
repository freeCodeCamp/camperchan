import { stat, unlink } from "fs/promises";
import { join } from "path";

import { assert } from "chai";

import { ExtendedClient } from "../../src/interfaces/ExtendedClient";
import { createLogFile } from "../../src/modules/createLogFile";

suite("createLogFile", () => {
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
