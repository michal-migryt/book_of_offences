const router = require("express").Router()
const {Entry, validate} = require("../models/entry")
const { Offense } = require("../models/offense")

router.post("/", async (req, res)=>{
    try{
    const { error } = validate(req.body)
    if (error)
    return res.status(400).send({message: error.details[0].message})
    const offense = await Offense.findOne({ name: req.body.offense})
    if(offense)
    {
    await new Entry({...req.body}).save()
    res.status(201).send({message:"Dodano wpis"})
    }
    else{
        res.status(410).send({message:"Nie ma takiego przewinienia"})
    }
    }
    catch (error){
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
    }
})
router.get("/", async (req, res) => {
    await Entry.find().then(entrys => res.json(entrys)).catch(err => res.status(400).json('Błąd: ' + err));
   })
router.post("/update/:id", async(req,res)=>{
    try{
        const { error } = validate(req.body)
        if (error)
        return res.status(400).send({message: error.details[0].message})
        const entry = await Entry.findById({_id:req.params.id})
        if(entry){
            const offense = await Offense.findOne({ name: req.body.offense})
            if(offense){
            entry.firstName = req.body.firstName
            entry.secondName = req.body.secondName
            entry.surname = req.body.surname
            entry.offense = req.body.offense
            
            await entry.save().then(()=> res.status(202).send({message:"Uaktualniono wpis o podanym id"}))
            }
            else{
                res.status(410).send({message:"Nie ma takiego przewinienia"})
            }
        }
        else{
            rest.status(501).send({message:"Nie znaleziono wpisu o podanym id"})
        }
        }
        catch (error){
            res.status(500).send({message: "Wewnętrzny błąd serwera"})
        }
})
router.delete("/:id", async (req, res)=>{
    await Entry.findOneAndDelete({_id: req.params.id}).then(()=>res.status(203).send({message:"Usunięto wpis o podanym id"}))
    .catch(() => {res.status(500).send({message: "Wewnętrzny błąd serwera"})})
})
module.exports = router