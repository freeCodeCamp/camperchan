import { logger } from '../utilities/logger';
import { ReactionDef } from './reaction-def';

export const halloweenReaction: ReactionDef = {
  emoji: '🎃',
  description:
    'Adds the halloween role to the user who reacts. The halloween role includes no additional permissions, but unlocks access to the halloween event channel. This allows the user to opt-in to participating in the Discord-powered trick or treat event.',
  command: async (reaction, { config, user }) => {
    if (!config.HALLOWEEN_ROLE || !config.HALLOWEEN_ANNOUNCEMENT) {
      logger.warn('Missing config values for Halloween feature.');
      return;
    }
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
      logger.warn(
        'A user reacted to the Halloween message, but the bot was unable to locate them.'
      );
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
