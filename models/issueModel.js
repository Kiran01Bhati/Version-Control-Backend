const mongoose = rquire('mongoose');
const { Schema } = require('mongoose');

const { Schema } = mongoose;

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
  type: String,
 required: true,
    },
    status:{
        type: String,
        enum: ['open', 'closed'], // Define the allowed values for status
        default: 'open', 
    },
    repository:{
        type: Schema.Types.ObjectId, 
        ref:'Repository',
        required: true,
    },

});

const Issue = mongoose.model('Issue', IssueSchema);
export default Issue;