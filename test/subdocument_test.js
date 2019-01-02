const assert = require('assert')
const User = require('../src/user')

describe('subdocuments', () => {
  it('can create a sub document', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'postTitle'}]
    })
    joe.save()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'postTitle')
        done()
      })
  })

  it('Can add sub documents to an existing record', (done) => {
    const joe = new User({
      name: 'Joe', 
      posts: [],
    })
    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => { 
        user.posts.push({ title: 'New Post'})
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post')
        done()
      })
  })

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe', 
      posts: [{ title: 'New Title'}],
    })
    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => { 
        user.posts[0].remove() // remove is a mongoose function 
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length === 0)
        done()
      })

  })



})