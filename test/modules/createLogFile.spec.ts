import { stat, unlink } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createLogFile } from "../../src/modules/createLogFile.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("createLogFile", () => {
  it("is defined", () => {
    expect(createLogFile, "createLogFile is not defined").toBeDefined();
    expect(createLogFile, "createLogFile is not a function").toBeTypeOf("function");
  });

  it("returns the expected data structure", async() => {
    const mockBot = { privateLogs: {} } as ExtendedClient;
    await createLogFile(mockBot, "Naomi");
    expect(mockBot.privateLogs, "Naomi is not defined").toHaveProperty("Naomi");
    expect(mockBot.privateLogs.Naomi, "Naomi is not Naomi").toBe("Naomi");
    const logPath = join(process.cwd(), "logs", "Naomi.txt");
    const status = await stat(logPath);
    expect(status.isFile(), "Naomi.txt is not a file").toBeTruthy();
    await unlink(logPath);
  });
});
