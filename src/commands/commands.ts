import { CommandDef } from './command-def';
import { eightBall } from './eightball';
import { help } from './help';
import { stats } from './stats';
import { coc } from './coc';
import { forum } from './forum';
import { format } from './format';
import { triviaCommand } from './trivia';
import { userCommand } from './user';
import { quote } from './quote';
import { modLinks } from './modLinks';
import { moderate } from './moderate';

export const COMMANDS: Array<CommandDef> = [
  eightBall,
  help,
  stats,
  coc,
  forum,
  format,
  triviaCommand,
  userCommand,
  quote,
  modLinks,
  moderate
];
