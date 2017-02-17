class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = { id, name, room };
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser(id) {
    var users = this.users.filter((user) => {
      return user.id === id;
    });
    return users[0];
  }

  getUserList(room) {
    var users = this.users.filter((user) => {
      // if true it will kept, if it returns false, it will be removed
      return user.room === room;
    });

    // map -> convert array of objects to array of strings
    var namesArray = users.map((user) => {
      return user.name;
    });
    // or short version
    // var users = this.users.filter((user) => user.room === room);
    // var namesArray = users.map((user) => user.name);

    return namesArray;
  }


}

module.exports = { Users };