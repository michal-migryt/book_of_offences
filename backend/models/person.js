const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:{
        type: String, 
        required: true,
        trim: true    
    },
    secondName:{
        type: String,
        trim: true 
    },
    surname:{
        type: String,
        required: true,
        trim: true
    },
    offense:{
        type: String,
        required: true
    }
}, {timestamps:true})

const Person = mongoose.model("Person", personSchema);
const validate = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label("First name"),
        secondName: Joi.string().label("Second name").allow(null, ''),
        surname: Joi.string().required().label("Surname"),
        offense: Joi.string().required().label("Offense")
    })
}
module.exports = {Person, validate};