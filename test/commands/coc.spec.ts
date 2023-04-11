import { assert } from "chai";

import { coc } from "../../src/commands/coc";

suite("coc command", () => {
  test("coc command is defined", () => {
    assert.isDefined(coc);
  });

  test("coc is a command object", () => {
    assert.isDefined(coc.data);
    assert.isObject(coc.data);
    assert.isDefined(coc.run);
    assert.isFunction(coc.run);
  });

  test("coc command has correct data", () => {
    assert.equal(coc.data.name, "coc");
    assert.equal(
      coc.data.description,
      "Returns information on freeCodeCamp's Code of Conduct."
    );
    assert.lengthOf(coc.data.options, 0);
  });
});
