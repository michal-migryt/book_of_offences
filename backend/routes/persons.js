const router = require("express").Router()
const {Person, validate} = require("../models/person")

router.post("/", async (req, res)=>{
    try{
    const { error } = validate(req.body)
    if (error)
    return res.status(400).send({message: error.details[0].message})
    await new Person({...req.body}).save()
    res.status(201).send({message:"Dodano wpis"})
    }
    catch (error){
        res.status(500).send({message: "Wewnętrzny błąd serwera"})
    }
})
router.get("/", async (req, res) => {
    await Person.find().then(persons => res.json(persons)).catch(err => res.status(400).json('Błąd: ' + err));
   })
router.post("/update/:id", async(req,res)=>{
    try{
        const { error } = validate(req.body)
        if (error)
        return res.status(400).send({message: error.details[0].message})
        const person = await Person.findById({_id:req.params.id})
        if(person){
            person.firstName = req.body.firstName
            person.secondName = req.body.secondName
            person.surname = req.body.surname
            person.offense = req.body.offense
            await person.save().then(()=> res.status(202).send({message:"Uaktualniono wpis o podanym id"}))
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
    await Person.findOneAndDelete({_id: req.params.id}).then(()=>res.status(203).send({message:"Usunięto wpis o podanym id"}))
    .catch(() => {res.status(500).send({message: "Wewnętrzny błąd serwera"})})
})
module.exports = router