import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { ModerateConfig } from '../moderate-interface';

export const close = async (
  message: Message,
  moderate: ModerateConfig
): Promise<void> => {
  // Extract values
  const { author, content, channel, mentions } = message;
  const { suspendRole, logChannel } = moderate;
  const channelName = (channel as TextChannel).name;

  // Arguments
  const commandArguments = content.split(' ').slice(3);

  // Check for valid channel
  if (
    !channelName.startsWith('private') &&
    !channelName.startsWith('suspended')
  ) {
    await channel.send(
      'I am sorry, but I can only perform this action on suspended or private channels.'
    );
    return;
  }

  // Create channel deleted embed
  const deleteEmbed = new MessageEmbed()
    .setTitle('Channel Deleted')
    .setDescription(
      `${author} has closed and deleted the \`${channelName}\` (ID: \`${channel.id}\`) channel.`
    );

  // Handle flow for private channel
  if (channelName.startsWith('private')) {
    await channel.delete();
    await logChannel.send(deleteEmbed);
    return;
  }

  // Get accepted/denied flag
  const flag = commandArguments.shift();

  // Handle invalid flag
  if (flag !== 'accepted' && flag !== 'denied') {
    await channel.send('Do you want to accept or deny the user appeal?');
    return;
  }

  // Denied flag does not require user mention
  if (flag === 'denied') {
    deleteEmbed.addField('Status', 'The appeal was not approved');
    await channel.delete();
    await logChannel.send(deleteEmbed);
    return;
  }

  // Check for valid user mention
  const targetUser = mentions.members?.first();
  if (!targetUser) {
    await channel.send(
      'Please mention the user you wish to accept the appeal for.'
    );
    return;
  }

  // Remove suspended role, send log, delete channel.
  await targetUser.roles.remove(suspendRole);
  deleteEmbed.addField(
    'Status',
    `The appeal was approved and \`${targetUser.user.username}\`'s access was restored.`
  );
  await logChannel.send(deleteEmbed);
  await channel.delete();
  return;
};
