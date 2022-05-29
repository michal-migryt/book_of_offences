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
router.get("/", async (req, res) => {
    await Offense.find().then(offenses => res.json(offenses)).catch(err => res.status(400).json('Błąd: ' + err));
   })
router.post("/update", async (req, res)=>{
    try{
        const { error } = validate(req.body)
        if (error)
        return res.status(400).send({message: error.details[0].message})
        const offense = await Offense.findOne({ name:req.body.name})
        if (offense){
        offense.name = req.body.name
        offense.punishment = req.body.punishment
        offense.sentenceLength = req.body.sentenceLength
        offense.fineAmount = req.body.fineAmount
        await offense.save().then(()=>res.status(202).send({message:"Uaktualniono przewinienie"}))
        .catch(() => {res.status(500).send({message: "Wewnętrzny błąd serwera"})})
        }
        }
        catch (error){
            res.status(500).send({message: "Wewnętrzny błąd serwera"})
        }
})
router.delete("/", async (req, res)=>{
    Offense.findOneAndDelete({name:req.body.name}).then(()=>res.status(203).send({message:"Usunięto przewinienie"}))
    .catch(() => {res.status(500).send({message: "Wewnętrzny błąd serwera"})})
})
module.exports = router