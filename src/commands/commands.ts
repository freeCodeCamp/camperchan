import { CommandDef } from './command-def';
import { eightBall } from './eightball';
import { help } from './help';
import { stats } from './stats';
import { coc } from './coc';
import { closeCommand } from './close';
import { suspendCommand } from './suspend';

export const COMMANDS: Array<CommandDef> = [
  eightBall,
  help,
  stats,
  coc,
  suspendCommand,
  closeCommand
];
