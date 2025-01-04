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
    assert.equal(history?.bans, 1);
    assert.equal(history?.kicks, 0);
    assert.equal(history?.mutes, 0);
    assert.equal(history?.unmutes, 0);
    assert.equal(history?.warns, 0);
    assert.equal(history?.unbans, 0);
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
    assert.equal(history?.bans, 2);
    assert.equal(history?.kicks, 0);
    assert.equal(history?.mutes, 1);
    assert.equal(history?.unmutes, 0);
    assert.equal(history?.warns, 0);
    assert.equal(history?.unbans, 0);
  });
});
