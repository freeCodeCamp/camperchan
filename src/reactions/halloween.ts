import { logger } from '../utilities/logger';
import { ReactionDef } from './reaction-def';

export const halloweenReaction: ReactionDef = {
  emoji: '🎃',
  description: 'Adds the halloween role to the user who reacts',
  command: async (reaction, { config, user }) => {
    const hallowRole = reaction.message.guild?.roles.cache.find(
      (role) => role.name === config.HALLOWEEN_ROLE
    );
    if (!hallowRole) {
      logger.warn('Halloween role not found');
      return;
    }
    if (reaction.message.id !== config.HALLOWEEN_ANNOUNCEMENT) {
      return;
    }
    if (user.partial) {
      user = await user.fetch();
    }
    const target = reaction.message.guild?.member(user);
    if (!target) {
      logger.warn('user error');
      return;
    }
    if (target.roles.cache.find((r) => r === hallowRole)) {
      target.roles.remove(hallowRole).catch((e) => logger.error(e));
      reaction.message.reactions.cache.get('🎃')?.remove();
      return;
    }
    target.roles.add(hallowRole).catch((e) => logger.error(e));
    reaction.message.reactions.cache.get('🎃')?.remove();
  }
};
