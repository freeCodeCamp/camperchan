import { Command } from "../interfaces/Command";
import { GuildCommand } from "../interfaces/GuildCommand";
import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { WrappedCommand } from "../interfaces/WrappedCommand";

type UnwrappedCommand = Command | GuildCommand | PrivilegedCommand;

const isPrivilegedCommand = (
  command: UnwrappedCommand
): command is PrivilegedCommand => {
  return (
    isGuildCommand(command) &&
    !!(command as PrivilegedCommand).requiredPermissions
  );
};

const isGuildCommand = (command: UnwrappedCommand): command is GuildCommand => {
  return (command as GuildCommand)?.guildOnly === true;
};

const wrapPrivilegedCommand = (command: PrivilegedCommand): WrappedCommand => {
  return wrapGuildCommand({
    ...command,
    async run(Bot, interaction) {
      const { permissions } = interaction.member;
      const hasAllRequiredPermissions = command.requiredPermissions.every(
        (perm) => permissions.has(perm)
      );

      if (typeof permissions === "string" || !hasAllRequiredPermissions) {
        await interaction.reply(
          "You do not have permission to use this command."
        );
        return;
      }

      return command.run(Bot, interaction);
    },
  });
};

const wrapGuildCommand = (command: GuildCommand): WrappedCommand => {
  return {
    ...command,
    wrapped: true,
    async run(Bot, interaction) {
      if (!interaction.inCachedGuild()) {
        await interaction.reply("This command can only be used in a guild.");
        return;
      }

      return command.run(Bot, interaction);
    },
  };
};

const wrapCommand = (command: Command): WrappedCommand => {
  return {
    ...command,
    wrapped: true,
  };
};

/**
 * Wrap higher-level commands (e.g. Privileged and Guild commands) with their
 * appropriate gates.
 *
 * For example, PrivilegedCommands carry information about the required
 * permissions to execute them. But their implementation doesn't stop
 * unauthorized users from executing them. "Wrapping" them adds this logic
 * and converts them to WrappedCommand objects in order to assert they're
 * safe to register.
 *
 * @param {UnwrappedCommand[]} commands The commands to wrap.
 * @returns {WrappedCommand[]} Wrapped versions of the provided commands.
 */
export const wrapCommands = (
  commands: UnwrappedCommand[]
): WrappedCommand[] => {
  return commands.map((command) => {
    if (isPrivilegedCommand(command)) {
      return wrapPrivilegedCommand(command);
    }
    if (isGuildCommand(command)) {
      return wrapGuildCommand(command);
    }

    return wrapCommand(command);
  });
};
