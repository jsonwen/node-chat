const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    var from = 'Jason';
    var text = 'Hi';
    var message = generateMessage(from, text);

    //expect(message.from).toBe(message.from);
    //expect(message.text).toBe(message.text);
    expect(message).toInclude({ from, text });
    expect(message.createdAt).toBeA('number');

  });
});