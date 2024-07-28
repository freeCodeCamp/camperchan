import { describe, assert, test } from "vitest";
import { addFormatting } from "../../src/modules/addFormatting.js";
import type { Message } from "discord.js";

const typeCoerce = (object: unknown): Message => {
  return object as Message;
};

describe("addFormatting", () => {
  test("is defined", () => {
    assert.isDefined(addFormatting, "addFormatting is not defined");
    assert.isFunction(addFormatting, "addFormatting is not a function");
  });

  test("should format HTML", async() => {
    const content = "<p>Hello</p>";
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, "```XML\n<p>Hello</p>\n```");
  });

  test("should format CSS", async() => {
    const content = "body { color: red }";
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, "```css\nbody {\n  color: red;\n}\n```");
  });

  test("should format SCSS", async() => {
    const content = "body { color: red }";
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, "```css\nbody {\n  color: red;\n}\n```");
  });

  test("should format JS", async() => {
    const content = "const foo = 'bar';";
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, `\`\`\`js\nconst foo = "bar";\n\`\`\``);
  });

  test("should format TS", async() => {
    const content = "const foo: string = 'bar';";
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, "```TypeScript\nconst foo: string = 'bar';\n```");
  });

  test("should format JSX", async() => {
    const content = `let jsxElement=(<div className="App"><h1 className="Naomi">Welcome To freeCodeCamp</h1><p>Hello World</p></div>);`;
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(
      output,
      `\`\`\`js\nlet jsxElement = (\n  <div className="App">\n    <h1 className="Naomi">Welcome To freeCodeCamp</h1>\n    <p>Hello World</p>\n  </div>\n);\n\`\`\``,
    );
  });

  test("should format PHP", async() => {
    const content = `<?php echo "Hello World"; ?>`;
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, `\`\`\`PHP\n<?php echo "Hello World"; ?>\n\`\`\``);
  });

  /*
   * TODO: Python is currently throwing a CSS sytnax error?
   *   test("should format Python", async () => {
   *     const content = `for i in range(10):\n  print(i)`;
   *     const output = await addFormatting(typeCoerce({ content }));
   *     assert.equal(output, `\`\`\`Python\nprint("Hello World")\n\`\`\``);
   *   });
   */

  test("should format Markdown", async() => {
    const content = `# Hello World\n\n## Subheading\n\n- List Item`;
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(
      output,
      `\`\`\`markdown\n# Hello World\n\n## Subheading\n\n- List Item\n\`\`\``,
    );
  });

  test("should format JSON", async() => {
    const content = `{"name": "Naomi"}`;
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(output, `\`\`\`json\n{ "name": "Naomi" }\n\`\`\``);
  });

  test("should format HTTP", async() => {
    const content = `GET / HTTP/1.1\nHost: example.com\n\n`;
    const output = await addFormatting(typeCoerce({ content }));
    assert.equal(
      output,
      `\`\`\`HTTP\nGET / HTTP/1.1\nHost: example.com\n\n\`\`\``,
    );
  });
});
