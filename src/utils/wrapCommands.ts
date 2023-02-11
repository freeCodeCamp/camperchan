import { Command } from "../interfaces/Command";
import { GuildCommand } from "../interfaces/GuildCommand";
import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { WrappedCommand } from "../interfaces/WrappedCommand";

type UnwrappedCommand = Command | GuildCommand | PrivilegedCommand;

/**
 * Type guard to determine if command is a PrivilegedCommand.
 *
 * @param {UnwrappedCommand} command An unwrapped command that may or may not be privileged.
 * @returns {command is PrivilegedCommand} Whether the command is a PrivilegedCommand.
 */
const isPrivilegedCommand = (
  command: UnwrappedCommand
): command is PrivilegedCommand => {
  return (
    isGuildCommand(command) &&
    !!(command as PrivilegedCommand).requiredPermissions
  );
};

/**
 * Type guard to determine if command is a GuildCommand.
 *
 * @param {UnwrappedCommand} command An unwrapped command that may or may not be guild-only.
 * @returns {command is GuildCommand} Whether the command is a GuildCommand.
 */
const isGuildCommand = (command: UnwrappedCommand): command is GuildCommand => {
  return (command as GuildCommand)?.guildOnly === true;
};

/**
 * Wrap a PrivilegedCommand.
 *
 * Accepts a PrivilegedCommand and returns a WrappedCommand where the source command's run
 * method will only be invoked if the calling entity has all the permissions enumerated
 * in the source command's requiredPermissions property.
 *
 * If the calling entity does not have sufficient permissions, the command will be
 * rejected with a replay informing the calling entity that they lack permissions to
 * execute the command.
 *
 * This function *also* wraps the source command as a GuildCommand because all
 * PrivilegedCommands must be GuildCommands (as permissions are attached to Guilds).
 *
 * @param {PrivilegedCommand} command The source command.
 * @returns {WrappedCommand} A wrapped version of the source command.
 */
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

/**
 * Wrap a PrivilegedCommand.
 *
 * Accepts a PrivilegedCommand and returns a WrappedCommand where the source command's run
 * method will only be invoked if the calling entity has all the permissions enumerated
 * in the source command's requiredPermissions property.
 *
 * @param {PrivilegedCommand} command The source command.
 * @returns {WrappedCommand} A wrapped version of the source command.
 */
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

/**
 * Helper function to declare that a source Command is now Wrapped.
 *
 * This function does not actually wrap the command. Make sure to do
 * that separately.
 *
 * @param {Command} command The source command.
 * @returns {WrappedCommand} The source command as a WrappedCommand.
 */
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
