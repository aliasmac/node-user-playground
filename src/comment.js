const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

const CommentModel = mongoose.model('comment', CommentSchema)

module.exports = CommentModel;