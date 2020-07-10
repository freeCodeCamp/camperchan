import { CommandDef } from './command-def';
import { eightBall } from './eightball';
import { help } from './help';
import { stats } from './stats';
import { coc } from './coc';
import { closeCommand } from './close';
import { suspendCommand } from './suspend';
import { forum } from './forum';
import { format } from './format';
import { triviaCommand } from './trivia';

export const COMMANDS: Array<CommandDef> = [
  eightBall,
  help,
  stats,
  coc,
  suspendCommand,
  closeCommand,
  forum,
  format,
  triviaCommand
];
