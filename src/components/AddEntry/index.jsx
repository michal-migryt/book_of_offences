import { useState, useRef} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
    }
const AddEntry = () => {
const [data, setData] = useState({
firstName: "",
secondName:"",
surname: "",
offense: "",
})
const [offensesNames, setOffensesNames] = useState({name:""})
const [foundNames, setFoundNames] = useState(false)
const offenseRef = useRef()
if (!foundNames)
{
axios.get("http://localhost:8080/api/offenses/names").then((response) =>{
    setOffensesNames(response.data)
    setFoundNames(true)
    console.log(offensesNames)
})
}
const [error, setError] = useState("")
const [success, setSuccess] = useState("")
const navigate = useNavigate()
const handleChange = ({ currentTarget: input }) => {
setData({ ...data, [input.name]: input.value })
}
const handleSubmit = async (e) => {
e.preventDefault()
try {
const url = "http://localhost:8080/api/entries"
setData({...data, ["offense"]: offenseRef.current.value })
const { data: res } = await axios.post(url, data)
console.log(res.message)
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
return ( foundNames &&
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
<h1>Tworzenie wpisu</h1>
<label>
    Imię sprawcy:
<input
type="text"
placeholder="Podaj imie sprawcy"
name="firstName"
onChange={handleChange}
value={data.firstName}
required
className={styles.input}
/>
</label>
<label>
    Drugie imię sprawcy:
<input
type="text"
placeholder="Podaj drugie imię sprawcy"
name="secondName"
onChange={handleChange}
value={data.secondName}
className={styles.input}
/>
</label>
<label>
    Nazwisko sprawcy:
<input
type="text"
placeholder="Podaj nazwisko sprawcy"
name="surname"
onChange={handleChange}
value={data.surname}
required
className={styles.input}
/>
</label>
{foundNames ?
<label>
    
          Rodzaj przewinienia:
          <select ref={offenseRef} className={styles.select} onChange={()=>{console.log(offenseRef.current.value)}}>   
            {offensesNames.map((v, i)=>{
                return <option>{v["name"]}</option>
            })}
          </select>
          </label> : null
    }

{error && <div
className={styles.error_msg}>{error}</div>}
{success && <div
className={styles.success}>{success}</div>}
<button type="submit"
className={styles.green_btn}>
Dodaj wpis
</button>
</form>
</div>
);
};
export default AddEntry