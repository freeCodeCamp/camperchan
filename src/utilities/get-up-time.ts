import { Client } from 'discord.js';

/**
 * Returns the time the client has been up in the following format:
 * days hours minutes seconds
 */
export function getUpTime(client: Client): string {
  let totalSeconds = (client.uptime || 0) / 1000;
  const days =
    Math.floor(totalSeconds / 86400) <= 0
      ? ''
      : Math.floor(totalSeconds / 86400) < 10
      ? `0${Math.floor(totalSeconds / 86400)} days`
      : `${Math.floor(totalSeconds / 86400)} days`;

  const hours =
    Math.floor(totalSeconds / 3600) <= 0
      ? ''
      : Math.floor(totalSeconds / 3600) < 10
      ? `0${Math.floor(totalSeconds / 3600)} hours`
      : `${Math.floor(totalSeconds / 3600)} hours`;

  totalSeconds %= 3600;
  const minutes =
    Math.floor(totalSeconds / 60) <= 0
      ? ''
      : Math.floor(totalSeconds / 60) < 10
      ? `0${Math.floor(totalSeconds / 60)}  minutes`
      : `${Math.floor(totalSeconds / 60)} minutes`;

  const seconds =
    Math.floor(totalSeconds % 60) < 10
      ? `0${Math.floor(totalSeconds % 60)} seconds`
      : `${Math.floor(totalSeconds % 60)} seconds`;

  return `${days} ${hours} ${minutes} ${seconds}`;
}
