const mongoose = require('mongoose');
const {Schema} =require('mongoose');
const NoteSchema = new Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref :'user'
    },
    title:{
        type: String,
        required: true,
        default:'unknown'
    },
    description:{
        type: String
    },
    tag:{
        type: String,
        default:'general'
    },
    date:{
        type: Date,
        default: Date.now
    }
}) // Is like Table Structure from SQL
module.exports = mongoose.model('note',NoteSchema);