const mongoose = rquire('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,  
    },
    password:{
        type: String,
    },
    repositories: [{
        default: [],
        type: Schema.Types.ObjectId, // Assuming you have a Repository model defined
        ref: 'Repository' // Reference to the Repository model
    },
],

//keep track of the repositories that the current user is following
followedUsers: [{
        default: [],
        type: Schema.Types.ObjectId, // Assuming you have a Repository model defined
        ref: 'Users' // user ID is stored here
    },
],

//keep track of the repositories that the current user has starred
starRepos: [{
        default: [],
        type: Schema.Types.ObjectId, // Assuming you have a Repository model defined
        ref: 'Repository' // Reference to the Repository model
    },
],

});
 // Create a model from the schema
const User = mongoose.model('User', UserSchema);