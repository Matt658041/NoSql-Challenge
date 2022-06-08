const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const FriendSchema = new Schema(
    {
        friendName: {
            type: String,
            unique: true,
            trim: true,
            maxlength: 10,
            required: true

        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'This e-mail address is incorrect']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [FriendSchema]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total count of friends on retrieval
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//create the User model using the UserSchema
const User = model('User', UserSchema);

//export the User model
module.exports = User;
