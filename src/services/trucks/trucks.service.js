// Initializes the `trucks` service on path `/trucks`
const { Trucks } = require('./trucks.class');
const createModel = require('../../models/trucks.model');
const hooks = require('./trucks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trucks', new Trucks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trucks');

  service.hooks(hooks);
};
