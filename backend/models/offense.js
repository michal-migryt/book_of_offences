const mongoose = require('mongoose');
const Joi = require("joi")
const Schema = mongoose.Schema;

const offenseSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    // WITH ENUM 0-fine, 1- community works, 2-jail
    punishment:{
        type:String,
        required:true,
    },
    //
    sentenceLength:{
        type:String
    },
    fineAmount:{
        type:Number
    }
}, {timestamps:true})

const Offense = mongoose.model("Offense", offenseSchema);
const validate = (data) =>{
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        punishment: Joi.string().required().label("Punishment"),
        sentenceLength: Joi.string().label("Sentence Length(String)"),
        fineAmount: Joi.number().label("Fine Amount")
    })
    return schema.validate(data)
}
module.exports = {Offense, validate};
