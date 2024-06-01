const mongoose = require('mongoose');

const notionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Notion', notionSchema)