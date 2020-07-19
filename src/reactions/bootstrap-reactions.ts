import { Client, Collection } from 'discord.js';
import { Config } from '../config/get-config';
import { REACTIONS } from './reactions';
import { ReactionDef } from './reaction-def';

export const bootstrapReactions = ({
  client,
  config
}: {
  client: Client;
  config: Config;
}): void => {
  const reactions = REACTIONS.reduce(
    (acc, reactionDef) => acc.set(reactionDef.emoji, reactionDef),
    new Collection<string, ReactionDef>()
  );

  client.on('messageReactionAdd', async (reaction) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        reaction.message.channel.send(
          'Something went wrong! Failed to format code :('
        );
        console.error(error);
        return;
      }
    }

    if (!reactions.has(reaction.emoji.name)) {
      // we don't care about this emoji
      return;
    }
    try {
      reactions.get(reaction.emoji.name)?.command(reaction, { client, config });
    } catch (error) {
      console.error(error);
      // don't warn end users, just log the error
    }
  });
};
