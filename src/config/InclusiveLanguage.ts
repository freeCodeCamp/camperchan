import { Config } from "alex";

export const InclusiveLanguage: Config = {
  profanitySureness: 1,
  noBinary: true,
  // AlexJS to ignore these grouped words https://github.com/retextjs/retext-equality/blob/main/rules.md
  allow: ["he-she"],
};
