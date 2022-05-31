const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
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

const Entry = mongoose.model("Entry", entrySchema);
const validate = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label("First name"),
        secondName: Joi.string().label("Second name").allow(null, ''),
        surname: Joi.string().required().label("Surname"),
        offense: Joi.string().required().label("Offense")
    })
    return schema.validate(data)
}
module.exports = {Entry, validate};