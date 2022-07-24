import { Tag } from "../interfaces/Tag";

export const Tags: Tag[] = [
  {
    name: "picture",
    message:
      "Pictures of code are hard to read and cannot be copied into a local IDE for debugging. Please send your actual code or a link to your repository, instead of a picture.",
  },
  {
    name: "gist",
    message:
      "Large amounts of code are disruptive to chat. Instead, please send a link to your repository, or a link to a [GitHub gist](https://gist.github.com/), [PasteBin](https://pastebin.com/), or similar.",
  },
  {
    name: "format",
    message:
      "Discord has support for code block syntax. Please repost your code using this syntax:\n\n\\`\\`\\`lang\ncode here\n\\`\\`\\`\n\nYou can replace `lang` with your code's language, such as `js`, to get syntax highlighting.",
  },
  {
    name: "ask",
    "message:
      "Don't ask to ask, just ask\n<https://dontasktoask.com>"
  }
];
