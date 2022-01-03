import { ContextMenuInteraction } from "discord.js";

import { Camperbot } from "./Camperbot";

export interface Context {
  data: {
    name: string;
    type: 2 | 3;
  };
  run: (Bot: Camperbot, interaction: ContextMenuInteraction) => Promise<void>;
}
