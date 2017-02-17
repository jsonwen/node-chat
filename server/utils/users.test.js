const expect = require('expect');
const { Users } = require('./users');

describe('Users', () => {
  var seedUsers;

  beforeEach(() => {
    seedUsers = new Users();
    seedUsers.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node course'
    }, {
      id: 2,
      name: 'Jen',
      room: 'React course'
    }, {
      id: 3,
      name: 'Jason',
      room: 'Node course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: 1,
      name: 'Jason',
      room: 'AB'
    }
    var newUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var usersList = seedUsers.getUserList('Node course');
    expect(usersList).toEqual(['Mike', 'Jason']);
  });

  it('should return names for react course', () => {
    var usersList = seedUsers.getUserList('React course');
    expect(usersList).toEqual(['Jen']);
  });

  it('should get a user', () => {
    var userToGet = seedUsers.users[1];
    var pulledUser = seedUsers.getUser(userToGet.id);
    expect(pulledUser).toEqual(userToGet);
  });

  it('should not get a user', () => {
    var pulledUser = seedUsers.getUser(seedUsers.users.length + 1);
    expect(pulledUser).toNotExist();
  });

  it('should remove a user', () => {
    var userToRemove = seedUsers.users[1];
    var removedUser = seedUsers.removeUser(userToRemove.id);
    expect(removedUser).toEqual(userToRemove);
  })

  it('should not remove a user', () => {
    var removedUser = seedUsers.getUser(seedUsers.users.length + 1);
    expect(removedUser).toNotExist();
  })

});