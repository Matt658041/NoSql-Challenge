const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

// also used to be reply schema in the pizza hunt challenge for future reference.
const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent thought id
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
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
        {
            toJSON: {
                virtuals: true,
                getters:true
            },
            id: false
        }
    );
    const ThoughtSchema = new Schema(
        {
            writtenBy: { 
                type: String,
                required: true
            },
            thoughtBody: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: createdAtVal => dateFormat(createdAtVal)
            },
            //use Reaction Schema to validate data for reply
            reactions: [ReactionSchema]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }
    );
           
     ThoughtSchema.virtual('reactionCount').get(function(){
         return this.reactions.length;
     });

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought;