import { Message, MessageEmbed } from 'discord.js';
import { ModerateConfig } from '../moderate-interface';

export const privateCommand = async (
  message: Message,
  moderate: ModerateConfig
): Promise<void> => {
  // Extract values
  const { author, guild } = message;
  const { modRole, botRole, targetUser, category, logChannel } = moderate;

  // This is already handled in the command...
  if (!targetUser || !botRole || !modRole) {
    return;
  }

  // Create channel
  const channelName = `private-${targetUser.user.username}`;

  await guild?.channels.create(channelName, {
    type: 'text',
    permissionOverwrites: [
      {
        id: targetUser.id,
        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
        deny: ['CREATE_INSTANT_INVITE']
      },
      {
        id: guild.id,
        deny: [
          'VIEW_CHANNEL',
          'READ_MESSAGE_HISTORY',
          'SEND_MESSAGES',
          'CREATE_INSTANT_INVITE'
        ]
      },
      {
        id: botRole,
        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
        deny: ['CREATE_INSTANT_INVITE']
      },
      {
        id: modRole,
        allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
        deny: ['CREATE_INSTANT_INVITE']
      }
    ],
    parent: category
  });

  // Send log
  const privateEmbed = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`Private Channel Created`)
    .addFields({
      name: 'What happened?',
      value: `${author} has created a private discussion channel for **${targetUser.user.username}** (${targetUser}).`
    })
    .setFooter(
      'This is not a suspension, but the notice is created for our records.'
    );
  logChannel.send(privateEmbed);
  return;
};
