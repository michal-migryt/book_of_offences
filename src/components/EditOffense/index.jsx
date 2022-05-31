import { useState, useRef} from "react"
import axios from "axios"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
    //window.location.reload()
    }

const EditOffense = () => {
const [data, setData] = useState({

})
const [editData, setEditData] = useState({
    name: "",
    punishment:"",
    sentenceLength:"",
    fineAmount:0
})
const {id} = useParams()
const [foundOffense, setFoundOffense] = useState(false)
const [didSetupForm, setDidSetupForm] = useState(false)
const punishmentRef  = useRef("Grzywna")
const sentenceSuffix = useRef("h")

const [error, setError] = useState("")
const [success, setSuccess] = useState("")
const [hideSentenceLen, setHideSentenceLen] = useState(false)
const navigate = useNavigate()
const [hideFineAmount, setHideFineAmonunt] = useState(false)
const setupFormularz = ()=>{
    var nazwa = editData["name"], kara = editData["punishment"],
     dlugoscKary = editData["sentenceLength"], wielkoscGrzywny = editData["fineAmount"];
     console.log("Nazwa: " + nazwa)
     setData({ ...data, "name": nazwa})
     punishmentRef.current.value = kara;
     if(dlugoscKary != null && dlugoscKary.length > 0){
     var suffix = dlugoscKary.slice(-1);
     console.log(suffix)
     sentenceSuffix.current.value = String(suffix);
     var dlKarytemp = parseInt(dlugoscKary);
     console.log(dlKarytemp)
     setData({ ...data, "sentenceLength": dlKarytemp })
     }

     setData({ ...data, "fineAmount": wielkoscGrzywny })
     }
const getOffense = async () => {
    //const { temp } = await axios("http://localhost:8080/api/offenses/"+id);
    await axios.get("http://localhost:8080/api/offenses/"+id).then((response) =>{
    setEditData(response.data); setFoundOffense(true);})
    //await sleep(1000);
    console.log(editData["name"]);
    setupFormularz();
    ManageBooleans();
    //const { temp } = await axios("http://localhost:8080/api/offenses/62922316d374a7e4a0b1cc51");
    //setEditData(temp);
    
    //punishmentRef.current.value = "Więzienie"
    
    
  };

     
//const {editData} = location.state
console.log(id)



const handleChange = ({ currentTarget: input }) => {
setData({ ...data, [input.name]: input.value })
}
function ManageBooleans() {
    if(punishmentRef.current.value !== "Grzywna")
        setHideSentenceLen(false)
    else
        setHideSentenceLen(true)
    if(punishmentRef.current.value !== "Prace społeczne" && punishmentRef.current.value !== "Więzienie")
        setHideFineAmonunt(false)
    else
        setHideFineAmonunt(true)
}
const handleSubmit = async (e) => {
e.preventDefault()

try {
    const tempSL = !hideSentenceLen ? data["sentenceLength"].toString() + sentenceSuffix.current.value : "";
    const tempFine = !hideFineAmount ? data["fineAmount"] : 0
    const dbobj={
    name:data["name"],
    punishment: punishmentRef.current.value,
    sentenceLength: tempSL,
    fineAmount: tempFine
}
const url = "http://localhost:8080/api/offenses"
const { data: res } = await axios.post(url, dbobj)
console.log(res.message)
// Dodac informacje o pomyślnym dodaniu
setSuccess(res.message)
setError("")
} catch (error) {
if (
error.response &&
error.response.status >= 400 &&
error.response.status <= 500
) {
setError(error.response.data.message)
setSuccess("")
}
}
}
if(!foundOffense)
 getOffense()
return  ( foundOffense && 
        <div className={styles.main_container}>
    <nav className={styles.navbar}>
        <button className={styles.back_btn}>
        <Link to="/">
            <img className={styles.img} src={arrow_back}>
        </img>
        </Link>
        </button>
        <h1>Kartoteka kryminalno-wykroczeniowa</h1>
        
    <button className={styles.white_btn} onClick={handleLogout}>
    Wyloguj się
    </button></nav>
    
    
    <form className={styles.form_container}
    onSubmit={handleSubmit}>
    <h1>Tworzenie przewinienia</h1>
    <label>
        Nazwa przewinienia:
    <input
    type="text"
    placeholder="Podaj nazwe przewinienia"
    name="name"
    onChange={handleChange}
    value={data.name}
    required
    className={styles.input}
    />
    </label>
    <label>
              Rodzaj kary:
              <select ref={punishmentRef} className={styles.select} onChange={ManageBooleans}>
                <option value='Grzywna'>Grzywna</option>
                <option value='Prace społeczne'>Prace społeczne</option>
                <option value='Prace społecznie i grzywna'>Prace społeczne i grzywna</option>
                <option value='Więzienie'>Więzienie</option>
                <option value='Więzienie i grzywna'>Więzienie i grzywna</option>
              </select>
              </label>
    {
        !hideSentenceLen ?
    <label className={`styles.sentenceLength`}>
        Długość wyroku:
    <input
    type="number"
    placeholder="Długość wyroku"
    name="sentenceLength"
    onChange={handleChange}
    value={data.sentenceLength}
    required
    className={styles.input}
    min={0}
    />
    Jednostka daty:
    <select ref={sentenceSuffix} className={styles.selectSentenceSuffix} onChange={()=>{console.log(sentenceSuffix.current.value)}}>
                <option value="h">Godziny</option>
                <option value='d'>Dni</option>
                <option value='m'>Miesiące</option>
                <option value='y'>Lata</option>
              </select>
    
    </label>
    : null
    }
    {!hideFineAmount ?
    <label>Wielkość grzywny:
    <input
    type="number"
    name="fineAmount"
    onChange={handleChange}
    value={data.fineAmount}
    required
    min={0}
    className={styles.input}
    />
    </label>
    : null
    }
    {error && <div
    className={styles.error_msg}>{error}</div>}
    {success && <div
    className={styles.success}>{success}</div>}
    <button type="submit"
    className={styles.green_btn}>
    Edytuj przewinienie
    </button>
    </form>
    </div>
    
    
    );

};

export default EditOffense