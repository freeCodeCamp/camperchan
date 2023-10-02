import { assert } from "chai";

import { pullComment } from "../../src/commands/pullComment";

suite("pullComment command", () => {
  test("pullComment command is defined", () => {
    assert.isDefined(pullComment);
  });

  test("pullComment is a command object", () => {
    assert.isDefined(pullComment.data);
    assert.isObject(pullComment.data);
    assert.isDefined(pullComment.run);
    assert.isFunction(pullComment.run);
  });

  test("pullComment command has correct data", () => {
    assert.equal(pullComment.data.name, "pull-comment");
    assert.equal(
      pullComment.data.description,
      "Adds a friendly comment to a pull request. Scoped to the freeCodeCamp organisation."
    );
    assert.lengthOf(pullComment.data.options, 3);
  });
});
