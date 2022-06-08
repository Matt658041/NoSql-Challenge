const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
{
      username: {
          type: String,
          required: true,
          trim: true,
          unique: true
      },
      createdAt: {
          type: Date,
          default: Date.now,
          get: createdAtVal => dateFormat(createdAtVal)
      },
      email: {
          type: String,
          required:[ true, "Email required"],
          unique: true,
          lowercase: true,
          validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
      }
     },
     friends: [
         {
             type:Schema.Types.ObjectId,
             ref: 'Thought'
         }
     ],
     thoughts: [
         {
             type: Schema.Types.ObjectId,
             ref: 'Thought'
         }
     ]
},
{
    toJson: {
        virtuals: true,
        getters: true
    },
    //prevents virtuals from creating duplicates
    id: false
}
);

//get count of thougths and reaction on retreival
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
       
});

const User = model('user', UserSchema);

module.exports = User;
