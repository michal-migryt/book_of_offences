const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:{
        type: String, 
        required: true,
        trim: true    
    },
    secondName:{
        type: String,
        required: false
    },
    surname:{
        type: String,
        required: true
    },
    offenseId:{
        type: mongoose.Types.ObjectId,
        ref: "Offense"
    }
}, {timestamps:true})

const Person = mongoose.model("Person", personSchema);

module.exports = Person;