const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
{
      userName: {
          type: String,
          required: true,
          trim: true,
          unique: true
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
UserSchema.vitual('friendCount').get(function() {
    return this.friends.reduce(
       (total, friend) => total + friend.replies.length +1,
       0
    );
});

const User = model('user', UserSchema);

module.exports = User;
