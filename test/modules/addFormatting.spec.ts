import { describe, expect, it } from "vitest";
import { addFormatting } from "../../src/modules/addFormatting.js";
import type { Message } from "discord.js";

const typeCoerce = (object: unknown): Message => {
  return object as Message;
};

describe("addFormatting", () => {
  it("is defined", () => {
    expect(addFormatting, "addFormatting is not defined").toBeDefined();
    expect(addFormatting, "addFormatting is not a function").toBeTypeOf("function");
  });

  it("should format HTML", async() => {
    const content = "<p>Hello</p>";
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe("```XML\n<p>Hello</p>\n```");
  });

  it("should format CSS", async() => {
    const content = "body { color: red }";
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe("```css\nbody {\n  color: red;\n}\n```");
  });

  it("should format SCSS", async() => {
    const content = "body { color: red }";
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe("```css\nbody {\n  color: red;\n}\n```");
  });

  it("should format JS", async() => {
    const content = "const foo = 'bar';";
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe(`\`\`\`js\nconst foo = "bar";\n\`\`\``);
  });

  it("should format TS", async() => {
    const content = "const foo: string = 'bar';";
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe("```TypeScript\nconst foo: string = 'bar';\n```");
  });

  it("should format JSX", async() => {
    const content = `let jsxElement=(<div className="App"><h1 className="Naomi">Welcome To freeCodeCamp</h1><p>Hello World</p></div>);`;
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe(`\`\`\`js\nlet jsxElement = (\n  <div className="App">\n    <h1 className="Naomi">Welcome To freeCodeCamp</h1>\n    <p>Hello World</p>\n  </div>\n);\n\`\`\``);
  });

  it("should format PHP", async() => {
    const content = `<?php echo "Hello World"; ?>`;
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe( `\`\`\`PHP\n<?php echo "Hello World"; ?>\n\`\`\``);
  });

  /*
   * TODO: Python is currently throwing a CSS syntax error?
   *   it("should format Python", async () => {
   *     const content = `for i in range(10):\n  print(i)`;
   *     const output = await addFormatting(typeCoerce({ content }));
   *     expect(output).toBe( `\`\`\`Python\nprint("Hello World")\n\`\`\``);
   *   });
   */

  it("should format Markdown", async() => {
    const content = `# Hello World\n\n## Subheading\n\n- List Item`;
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe(`\`\`\`markdown\n# Hello World\n\n## Subheading\n\n- List Item\n\`\`\``,
    );
  });

  it("should format JSON", async() => {
    const content = `{"name": "Naomi"}`;
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe(`\`\`\`json\n{ "name": "Naomi" }\n\`\`\``);
  });

  it("should format HTTP", async() => {
    const content = `GET / HTTP/1.1\nHost: example.com\n\n`;
    const output = await addFormatting(typeCoerce({ content }));
    expect(output).toBe(`\`\`\`HTTP\nGET / HTTP/1.1\nHost: example.com\n\n\`\`\``,
    );
  });
});
