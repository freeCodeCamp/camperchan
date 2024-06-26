import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  Role
} from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleRole: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.ManageGuild),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();

      const channel = interaction.options.getChannel("channel", true);
      const title = interaction.options.getString("header", true);
      if (!("send" in channel)) {
        await interaction.editReply("I can't send messages in that channel!");
        return;
      }
      const roleArray = [
        interaction.options.getRole("role1", true),
        interaction.options.getRole("role2"),
        interaction.options.getRole("role3"),
        interaction.options.getRole("role4"),
        interaction.options.getRole("role5")
      ].filter((el) => el) as Role[];

      const dividedRoles: Role[][] = [];
      while (roleArray.length) {
        dividedRoles.push(roleArray.splice(0, 5));
      }

      const components: ActionRowBuilder<ButtonBuilder>[] = [];
      for (const roleBlock of dividedRoles) {
        const buttons = roleBlock.map((el) =>
          new ButtonBuilder()
            .setLabel(el.name)
            .setCustomId(`rr-${el.id}`)
            .setStyle(ButtonStyle.Secondary)
        );
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          buttons
        );
        components.push(row);
      }
      await interaction.editReply({ content: "I've created the role post!" });
      await channel.send({
        content: title,
        components
      });
    } catch (err) {
      await errorHandler(CamperChan, "role subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};
