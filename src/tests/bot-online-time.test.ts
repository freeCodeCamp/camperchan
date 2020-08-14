import { getBotOnlineAt } from '../utilities/bot-online-time';

describe('botOnlineTime tests', () => {
  it('Should return string', () => {
    expect(getBotOnlineAt()).toBeDefined();
  });

  it('Should return colon sparated Hour:Minute:Second', () => {
    expect(getBotOnlineAt()).toMatch(/[0-9]{2}:[0-9]{2}:[0-9]{2}/g);
  });

  it('Should return time with AM or PM format', () => {
    expect(getBotOnlineAt()).toMatch(/(P|A)M/g);
  });

  it('Should return time format with GMT', () => {
    expect(getBotOnlineAt()).toMatch(/GMT(\+|-)[0-9]/g);
  });

  it('Should return Time, AM/PM and standard time zone separated by space', () => {
    expect(getBotOnlineAt()).toMatch(/ /g);
  });
});
