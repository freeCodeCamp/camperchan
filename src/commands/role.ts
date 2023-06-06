import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  Role,
  SlashCommandBuilder,
} from "discord.js";

import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { errorHandler } from "../utils/errorHandler";

export const role: PrivilegedCommand = {
  guildOnly: true,
  requiredPermissions: [PermissionFlagsBits.ManageRoles],
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Creates a post with buttons for self-assignable roles.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel to create the post in.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("header")
        .setDescription("Text to include at the top of the post.")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role1")
        .setDescription("Role to create a button for.")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option.setName("role2").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role3").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role4").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role5").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role6").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role7").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role8").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role9").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role10").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role11").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role12").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role13").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role14").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role15").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role16").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role17").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role18").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role19").setDescription("Role to create a button for.")
    )
    .addRoleOption((option) =>
      option.setName("role20").setDescription("Role to create a button for.")
    ),
  run: async (Bot, interaction) => {
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
        interaction.options.getRole("role6"),
        interaction.options.getRole("role7"),
        interaction.options.getRole("role8"),
        interaction.options.getRole("role9"),
        interaction.options.getRole("role10"),
        interaction.options.getRole("role11"),
        interaction.options.getRole("role12"),
        interaction.options.getRole("role13"),
        interaction.options.getRole("role14"),
        interaction.options.getRole("role15"),
        interaction.options.getRole("role16"),
        interaction.options.getRole("role17"),
        interaction.options.getRole("role18"),
        interaction.options.getRole("role19"),
        interaction.options.getRole("role20"),
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
        components,
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};
