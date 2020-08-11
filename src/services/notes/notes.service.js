// Initializes the `notes` service on path `/notes`
const { Notes } = require('./notes.class');
const createModel = require('../../models/notes.model');
const hooks = require('./notes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/notes', new Notes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notes');

  service.hooks(hooks);
};
