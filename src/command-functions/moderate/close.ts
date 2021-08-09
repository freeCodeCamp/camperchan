import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { ModerateConfig } from '../moderate-interface';

export const close = async (
  message: Message,
  moderate: ModerateConfig
): Promise<void> => {
  // Extract values
  const { author, channel } = message;
  const { logChannel } = moderate;
  const channelName = (channel as TextChannel).name;

  // Check for valid channel
  if (!channelName.startsWith('private')) {
    await channel.send(
      'I am sorry, but I can only perform this action on private channels.'
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
  await channel.delete();
  await logChannel.send({ embeds: [deleteEmbed] });
};
