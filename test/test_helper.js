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
  // GOTCHA: when mongoose loads up the connections from MongoDB, it lowercases the name
  // of the collections!! 
  const { users, comments, blogposts } = mongoose.connection.collections 
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
});    



