import { assert } from "chai";

import { quote } from "../../src/commands/quote";

suite("quote command", () => {
  test("quote command is defined", () => {
    assert.isDefined(quote);
  });

  test("quote is a command object", () => {
    assert.isDefined(quote.data);
    assert.isObject(quote.data);
    assert.isDefined(quote.run);
    assert.isFunction(quote.run);
  });

  test("quote command has correct data", () => {
    assert.equal(quote.data.name, "quote");
    assert.equal(quote.data.description, "Returns a motivational quote.");
    assert.lengthOf(quote.data.options, 0);
  });
});
