const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

function removeFieldRole(context) {
  const contextData = context.data;
  if (contextData.role) {
    delete contextData.role;
  }
  console.log(contextData);
  context.data = contextData;
  return context;
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ removeFieldRole, async (context) => {
      const users = await context.service.find();
      if (users.total == 0) {
        context.data.role = 'admin';
      }
      return context;
    }, hashPassword('password') ],
    update: [ removeFieldRole, hashPassword('password'),  authenticate('jwt') ],
    patch: [ removeFieldRole, hashPassword('password'),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
