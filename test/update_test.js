const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  // MODEL INSTANCES UPDATE

  // set 'n' save is useful when we want to independently update the 
  // properties of an model instance 
  it('instance type using set n save', (done) => {
    // .set is a mongoose method
    joe.set('name', 'Alex')
    assertName(joe.save(), done);
  });


  it('A model instance can update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });


  // CLASS UPDATES

  it('A model class can update', (done) => {
    assertName(
      User.updateMany({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  })

  // mongoDB update operators are best used when we want to update multiple records
  // use .set when we need to universally set a value of field
  it('A user can have their postcount incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });

});

// db.collection('Users').findOneAndUpdate({
//     _id: new ObjectID("5be3191ec469cc4eb2311f1b")
// }, {
//     $set: {
//         text: 'Aliasgar'
//     },
//     $inc: {
//         age: 9
//     }
// }, {
//     returnOriginal: false
// }).then((result) => {
//     console.log(result)
// })