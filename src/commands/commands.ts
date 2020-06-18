import { CommandDef } from './command-def';
import { eightBall } from './eightball';
import { help } from './help';
import { stats } from './stats';

export const COMMANDS: Array<CommandDef> = [eightBall, help, stats];
