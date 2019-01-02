const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// 'before' only executed one time before test suite runs
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true});
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});


beforeEach ((done) => {
    mongoose.connection.collections.users.drop(() => {
        // Ready to run the next test!
        done();
    })
})    



