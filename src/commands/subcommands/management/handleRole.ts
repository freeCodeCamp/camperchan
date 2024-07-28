import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  Role,
} from "discord.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleRole: Subcommand = {
  execute: async(camperChan, interaction) => {
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
        interaction.options.getRole("role5"),
      ].filter((opt) => {
        return opt instanceof Role;
      });

      const dividedRoles: Array<Array<Role>> = [];
      while (roleArray.length > 0) {
        dividedRoles.push(roleArray.splice(0, 5));
      }

      const components: Array<ActionRowBuilder<ButtonBuilder>> = [];
      for (const roleBlock of dividedRoles) {
        const buttons = roleBlock.map((element) => {
          return new ButtonBuilder().
            setLabel(element.name).
            setCustomId(`rr-${element.id}`).
            setStyle(ButtonStyle.Secondary);
        });
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          buttons,
        );
        components.push(row);
      }
      await interaction.editReply({ content: "I've created the role post!" });
      await channel.send({
        components: components,
        content:    title,
      });
    } catch (error) {
      await errorHandler(camperChan, "role subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return member.permissions.has(PermissionFlagsBits.ManageGuild);
  },
};
