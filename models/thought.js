const { Schema, model, Types } = require('mongoose');

const reactionSchema = require('./reactionSchema');


// Thought Schema

const ThoughtSchema = new Schema({

  thoughtText: {

    type: String,

    required: true,

    minlength: 1,

    maxlength: 280

  },

  createdAt: {

    type: Date,

    default: Date.now,

    get: createdAtVal => createdAtVal.toISOString()

  },

  username: {

    type: String,

    required: true

  },

  reactions: [reactionSchema]

},

{

  toJSON: {

    getters: true

  },

  id: false

});


// Virtual to get reaction count

ThoughtSchema.virtual('reactionCount').get(function() {

  return this.reactions.length;

});


const Thought = model('Thought', ThoughtSchema);


module.exports = Thought;