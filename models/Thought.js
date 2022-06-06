const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')


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
        writtenBy: {
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
                getters:true
            },
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