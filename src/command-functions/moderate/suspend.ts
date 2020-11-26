import { Message, MessageEmbed } from 'discord.js';
import { ModerateConfig } from '../moderate-interface';

export const suspend = async (
  message: Message,
  moderate: ModerateConfig
): Promise<void> => {
  // Extract values
  const { author, content, guild } = message;
  const {
    modRole,
    botRole,
    targetUser,
    suspendRole,
    category,
    logChannel
  } = moderate;

  // This is already handled in the command...
  if (!targetUser || !botRole || !modRole) {
    return;
  }

  // Get reason
  const reason = content.split(' ').slice(4).join(' ') || 'No reason provided';

  // Suspend user
  await targetUser?.roles.set([suspendRole]);

  // Create channel
  const channelName = `suspended-${targetUser.user.username}`;

  const suspendChannel = await guild?.channels.create(channelName, {
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

  // Send CoC message
  await suspendChannel?.send(
    `This is a standard message notifying ${targetUser} that you have been suspended from freeCodeCamp's Discord for ${reason}.

 This channel has been created for you to appeal this decision. In order to appeal the decision, you must complete the following steps:

 1. Read our Code of Conduct: https://code-of-conduct.freecodecamp.org/
 2. Read our rules in the #rules channel.
 3. Confirm in this channel that you have read it.
 4. Explain in this channel why you feel you should be un-suspended.

 /cc ${modRole}`
  );

  // Send log
  const suspendEmbed = new MessageEmbed()
    .setColor('#FF0000')
    .setTitle(`A user was suspended!`)
    .addFields(
      {
        name: 'What happened?',
        value: `${author} has suspended **${targetUser.user.username}** (${targetUser}).`
      },
      {
        name: 'Reason',
        value: `${reason}`
      }
    )
    .setFooter('Please remember to follow our rules!');
  logChannel.send(suspendEmbed);
};
