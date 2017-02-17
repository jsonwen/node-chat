var moment = require('moment');

var date = moment();
console.log(date.format('MMM do YYYY'));
date.add(1, 'year');
console.log(date.format('MMM do YYYY'));