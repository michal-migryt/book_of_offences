const router = require("express").Router()
const {Offense, validate} = require("../models/offense")

router.post("/", async (req, res)=>{
    try{
    const { error } = validate(req.body)
    if (error)
    return res.status(400).send({message: error.details[0].message})
    const offense = await Offense.findOne({ name:req.body.name})
    if (offense)
    return res.status(409).send({message:"Takie przewinienie już istnieje!"})
    await new Offense({...req.body}).save()
    res.status(201).send({message:"Dodano przewinienie."})
    }
    catch (error){
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
    }
})
module.exports = router