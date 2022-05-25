const lambda = require('./index');

lambda.handler()
    .then(res => console.log(res));
