import { describe, expect, it } from "vitest";
import { updateHistory } from "../../src/modules/updateHistory.js";
import { Database } from "../__mocks__/Database.mock.js";

const database = new Database();

describe("updateHistory", () => {
  it("updateHistory is a function", () => {
    expect(updateHistory).toBeTypeOf("function");
  });

  it("should create a new history when user does not exist", async() => {
    await updateHistory({ db: database } as never, "ban", "123");
    const history = await database.histories.findUnique({
      where: {
        userId: "123",
      },
    });
    expect(history).toBeTypeOf("object");
    expect(history?.bans).toBe(1);
    expect(history?.kicks).toBe(0);
    expect(history?.mutes).toBe(0);
    expect(history?.unmutes).toBe(0);
    expect(history?.warns).toBe(0);
    expect(history?.unbans).toBe(0);
  });

  it("should update an existing history", async() => {
    await updateHistory({ db: database } as never, "ban", "123");
    await updateHistory({ db: database } as never, "mute", "123");
    const history = await database.histories.findUnique({
      where: {
        userId: "123",
      },
    });
    expect(history).toBeTypeOf("object");
    expect(history?.bans).toBe(2);
    expect(history?.kicks).toBe(0);
    expect(history?.mutes).toBe(1);
    expect(history?.unmutes).toBe(0);
    expect(history?.warns).toBe(0);
    expect(history?.unbans).toBe(0);
  });
});
