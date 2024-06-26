import { describe, assert, test } from "vitest";

import { formatter } from "../../src/modules/formatter";

describe("formatter", () => {
  test("is defined", () => {
    assert.isDefined(formatter, "formatter is not defined");
    assert.isFunction(formatter, "formatter is not a function");
  });

  test("should format HTML", async () => {
    const content =
      "<div><p>Hello world this is a very long string from Naomi to force a line break.</p></div>";
    const output = await formatter(content, "html");
    assert.equal(
      output,
      "<div>\n  <p>\n    Hello world this is a very long string from Naomi to force a line break.\n  </p>\n</div>\n"
    );
  });

  test("should format CSS", async () => {
    const content = "body { color: red }";
    const output = await formatter(content, "css");
    assert.equal(output, "body {\n  color: red;\n}\n");
  });

  test("should format SCSS", async () => {
    const content = "@mixin center {margin: 0}";
    const output = await formatter(content, "css");
    assert.equal(output, "@mixin center {\n  margin: 0;\n}\n");
  });

  test("should format JS", async () => {
    const content = "const foo = 'bar';";
    const output = await formatter(content, "js");
    assert.equal(output, `const foo = "bar";\n`);
  });

  test("should format TS", async () => {
    const content = "const foo: string = 'bar';";
    const output = await formatter(content, "ts");
    assert.equal(output, `const foo: string = "bar";\n`);
  });

  test("should format JSX", async () => {
    const content = `let jsxElement=(<div className="App"><h1 className="Naomi">Welcome To freeCodeCamp</h1><p>Hello World</p></div>);`;
    const output = await formatter(content, "js");
    assert.equal(
      output,
      `let jsxElement = (\n  <div className="App">\n    <h1 className="Naomi">Welcome To freeCodeCamp</h1>\n    <p>Hello World</p>\n  </div>\n);\n`
    );
  });

  test("should format Markdown", async () => {
    const content = `# Hello World\n\n## Subheading\n\n- List Item`;
    const output = await formatter(content, "markdown");
    assert.equal(output, `# Hello World\n\n## Subheading\n\n- List Item\n`);
  });

  test("should format JSON", async () => {
    const content = `{"name": "Naomi"}`;
    const output = await formatter(content, "json");
    assert.equal(output, `{ "name": "Naomi" }\n`);
  });

  test("should format YAML", async () => {
    const content = `name: Naomi\nuse:\n - Naomi`;
    const output = await formatter(content, "yaml");
    assert.equal(output, `name: Naomi\nuse:\n  - Naomi\n`);
  });
});
