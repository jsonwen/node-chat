const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generete the correct location object', () => {
    var from = 'Admin';
    var latitude = '52.271234';
    var longitude = '4.8362981';
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;

    var message = generateLocationMessage(from, latitude, longitude);
    expect(message).toInclude({ from, url });
    expect(message.url).toBe(url);
    expect(message.createdAt).toBeA('number');
  });
});