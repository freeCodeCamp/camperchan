import { ReactionDef } from './reaction-def';
import { pin } from './pin';
import { formatReaction } from './format-reaction';
import { liveStreamReaction } from './livestream-reaction';

/**
 * List of commands to react based on message reactions
 */
export const REACTIONS: Array<ReactionDef> = [
  pin,
  formatReaction,
  liveStreamReaction
];
