import { describe, expect, it } from "vitest";
import { formatter } from "../../src/modules/formatter.js";

describe("formatter", () => {
  it("is defined", () => {
    expect(formatter,"formatter is not defined").toBeDefined();
    expect(formatter, "formatter is not a function").toBeTypeOf("function");
  });

  it("should format HTML", async() => {
    const content
      = `<div><p>Hello world this is a very long string from Naomi to force a line break.</p></div>`;
    const output = await formatter(content, "html");
    expect(output).toBe(`<div>\n  <p>\n    Hello world this is a very long string from Naomi to force a line break.\n  </p>\n</div>\n`,
    );
  });

  it("should format CSS", async() => {
    const content = "body { color: red }";
    const output = await formatter(content, "css");
    expect(output).toBe("body {\n  color: red;\n}\n");
  });

  it("should format SCSS", async() => {
    const content = "@mixin center {margin: 0}";
    const output = await formatter(content, "css");
    expect(output).toBe("@mixin center {\n  margin: 0;\n}\n");
  });

  it("should format JS", async() => {
    const content = "const foo = 'bar';";
    const output = await formatter(content, "js");
    expect(output).toBe( `const foo = "bar";\n`);
  });

  it("should format TS", async() => {
    const content = "const foo: string = 'bar';";
    const output = await formatter(content, "ts");
    expect(output).toBe( `const foo: string = "bar";\n`);
  });

  it("should format JSX", async() => {
    const content = `let jsxElement=(<div className="App"><h1 className="Naomi">Welcome To freeCodeCamp</h1><p>Hello World</p></div>);`;
    const output = await formatter(content, "js");
    expect(output).toBe(`let jsxElement = (\n  <div className="App">\n    <h1 className="Naomi">Welcome To freeCodeCamp</h1>\n    <p>Hello World</p>\n  </div>\n);\n`,
    );
  });

  it("should format Markdown", async() => {
    const content = `# Hello World\n\n## Subheading\n\n- List Item`;
    const output = await formatter(content, "markdown");
    expect(output).toBe( `# Hello World\n\n## Subheading\n\n- List Item\n`);
  });

  it("should format JSON", async() => {
    const content = `{"name": "Naomi"}`;
    const output = await formatter(content, "json");
    expect(output).toBe( `{ "name": "Naomi" }\n`);
  });

  it("should format YAML", async() => {
    const content = `name: Naomi\nuse:\n - Naomi`;
    const output = await formatter(content, "yaml");
    expect(output).toBe( `name: Naomi\nuse:\n  - Naomi\n`);
  });
});
