import { CommandDef } from './command-def';

export const radio: CommandDef = {
  prefix: 'radio',
  description: 'Play radio!',
  usage: 'radio',
  command: async (message) => {
    const cmdArguments = message.content.split(' ')[2];
    const connection = await message.member?.voice.channel?.join();
    const dispatcher = connection?.play(
      'https://coderadio-relay.freecodecamp.org/radio/8010/radio.mp3'
    );
    dispatcher?.on('start', () => {
      message.channel.send('Playing!');
    });
    if (cmdArguments === 'pause') {
      dispatcher?.pause();
    }
  }
};
