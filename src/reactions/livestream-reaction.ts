import { logger } from '../utilities/logger';
import { ReactionDef } from './reaction-def';

export const liveStreamReaction: ReactionDef = {
  emoji: '🎥',
  description: 'Adds the livestream role to the user who reacts',
  command: async (reaction, { config, user }) => {
    const streamRole = reaction.message.guild?.roles.cache.find(
      (role) => role.name === config.STREAM_NOTIFY_ROLE
    );
    if (!streamRole) {
      logger.warn('Stream role not found');
      return;
    }
    if (reaction.message.id !== config.STREAM_MSG_ID) {
      return;
    }
    if (user.partial) {
      user = await user.fetch();
    }
    const target = await reaction.message.guild?.members.fetch(user);
    if (!target) {
      logger.warn('user error');
      return;
    }
    if (target.roles.cache.find((r) => r === streamRole)) {
      target.roles.remove(streamRole).catch((e) => logger.error(e));
      reaction.message.reactions.cache.get('🎥')?.remove();
      return;
    }
    target.roles.add(streamRole).catch((e) => logger.error(e));
    reaction.message.reactions.cache.get('🎥')?.remove();
  }
};
