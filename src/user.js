const mongoose = require('mongoose')
const PostSchema = require('./post')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    name: {
      type: String, 
      validate: {
        validator: (name) => name.length > 2,
        message: 'Name must be longer than 2 characters.'
      },
      required: [true, 'Name is required.']    
    },
    posts: [PostSchema],
    likes: Number
})

// Creates a function that allows us to compute a value for the virtual property
// and use dot notation i.e. joe.postCount()

UserSchema.virtual('postCount').get(function() { 
  return this.posts.length;
})

const User = mongoose.model('user', UserSchema)

module.exports = User;


