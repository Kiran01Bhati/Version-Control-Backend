const mongoose = rquire('mongoose');
const { Schema } = require('mongoose');

const RepositorySchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
       type: String,

    },
     // list of names of files , folder
    content:[
        {
            type: String,
        },
    ],
    visibility:{
        type: Boolean,
    },

    owner: {
        type: Schema.Types.ObjectId, // Assuming you have a User model defined
        ref: 'User',
        required: true,
    },

    issues:[
        {
            type: Schema.Types.ObjectId, // Assuming you have an Issue model defined
            ref: 'Issue',
        },
    ],

});

const Repository = mongoose.model('Repository', RepositorySchema);