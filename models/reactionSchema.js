const { Schema, Types } = require('mongoose');


// Reaction Schema (used as a subdocument in Thought)

const ReactionSchema = new Schema({

  reactionId: {

    type: Schema.Types.ObjectId,

    default: () => new Types.ObjectId()

  },

  reactionBody: {

    type: String,

    required: true,

    maxlength: 280

  },

  username: {

    type: String,

    required: true

  },

  createdAt: {

    type: Date,

    default: Date.now,

    get: createdAtVal => createdAtVal.toISOString()

  }

},

{

  toJSON: {

    getters: true

  }

});


module.exports = ReactionSchema;