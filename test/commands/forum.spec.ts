import { assert } from "chai";

import { forum } from "../../src/commands/forum";

suite("forum command", () => {
  test("forum command is defined", () => {
    assert.isDefined(forum);
  });

  test("forum is a command object", () => {
    assert.isDefined(forum.data);
    assert.isObject(forum.data);
    assert.isDefined(forum.run);
    assert.isFunction(forum.run);
  });

  test("forum command has correct data", () => {
    assert.equal(forum.data.name, "forum");
    assert.equal(
      forum.data.description,
      "Returns the latest activity on the forum."
    );
    assert.lengthOf(forum.data.options, 0);
  });
});
