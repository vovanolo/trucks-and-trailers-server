const users = require('./users/users.service.js');
const trucks = require('./trucks/trucks.service.js');
const notes = require('./notes/notes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(trucks);
  app.configure(notes);
};
