import { Tag } from "../interfaces/Tag";

export const Tags: Tag[] = [
  {
    name: "picture",
    message:
      "Pictures of code are hard to read and cannot be copied into a local IDE for debugging. Please send your actual code or a link to your repository, instead of a picture.",
    aliases: ["pictures", "image", "images"],
  },
  {
    name: "gist",
    message:
      "Large amounts of code are disruptive to chat. Instead, please send a link to your repository, or a link to a [GitHub gist](https://gist.github.com/), [PasteBin](https://pastebin.com/), or similar.",
    aliases: ["gists"],
  },
  {
    name: "format",
    message:
      "Discord has support for code block syntax. Please repost your code using this syntax:\n\n\\`\\`\\`lang\ncode here\n\\`\\`\\`\n\nYou can replace `lang` with your code's language, such as `js`, to get syntax highlighting.",
    aliases: ["formatting", "code", "codeblock"],
  },
  {
    name: "ask",
    message: "Don't ask to ask, just ask\n<https://dontasktoask.com>",
    aliases: [],
  },
  {
    name: "xy",
    message:
      "It looks like you're asking about your attempted solution rather then your actual problem. We need to know what your problem is before we can help.\n" +
      "https://xyproblem.info",
    aliases: [],
  },
  {
    name: "markdown",
    message:
      `
Discord has support for Markdown formatting:

**Bold** - \`**Bold**\`
*Italic* - \`*Italic*\` or \`_Italic_\`
***Bold Italic*** - \`***Bold Italic***\`
__Underline__ - \`__Underline__\`
~~Strikethrough~~ - \`~~Strikethrough~~\`
__*Underline Italic*__ - \`__*Underline Italic*__\`
__**Underline Bold**__ - \`__**Underline Bold**__\`
__***Underline Bold Italic***__ - \`__***Underline Bold Italic***__\`

> Blockquote
\`> Blockquote\`

` +
      "`Inline Code` - \\`Inline Code\\`" +
      "\n\n```\nCode Block\n```\n\\`\\`\\`\nCode Block\n\\`\\`\\`" +
      "||```\nSpoilered Code\n```||\n\\|\\|\\`\\`\\`\nSpoilered Code\n\\`\\`\\`\\|\\|",
    aliases: ["markdown-formatting", "md", "md-formatting"],
  },
];
