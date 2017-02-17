// Class example in ES6

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getUserDescription() {
    return `${this.name} is ${this.age} years old`;
  }
}

var me = new Person('Jason', '22');
var description = me.getUserDescription();
console.log(description);
//exports.module = {  }