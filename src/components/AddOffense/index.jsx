import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
    }
const AddOffense = () => {
const [data, setData] = useState({
name: "",
punishment: "",
sentenceLength: 0,
fineAmount: 0,
})
const punishmentRef  = React.useRef()
const sentenceSuffix = React.useRef()
const [error, setError] = useState("")
const navigate = useNavigate()
const handleChange = ({ currentTarget: input }) => {
setData({ ...data, [input.name]: input.value })
}
const handleSubmit = async (e) => {
e.preventDefault()

try {
    console.log(sentenceSuffix.current.value)
    const tempP = punishmentRef.current.value
    setData({...data, ["punishment"]:tempP})
const temp =  data["sentenceLength"].toString() + sentenceSuffix.current.toString()
setData({...data, ["sentenceLength"]:temp})
const url = "http://localhost:8080/api/offenses"
const { data: res } = await axios.post(url, data)
console.log(res.message)
// Dodac informacje o pomyślnym dodaniu
} catch (error) {
if (
error.response &&
error.response.status >= 400 &&
error.response.status <= 500
) {
setError(error.response.data.message)
}
}
}

return (
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
<input
type="text"
placeholder="Nazwa przewinienia"
name="name"
onChange={handleChange}
value={data.name}
required
className={styles.input}
/>
<label>
          Wybierz rodzaj kary:
          </label>
          <select ref={punishmentRef} className={styles.select} onChange={()=>{}}>
            <option value='Grzywna'>Grzywna</option>
            <option value='Prace społeczne'>Prace społeczne</option>
            <option value='Prace społecznie i grzywna'>Prace społeczne i grzywna</option>
            <option value='Więzienie'>Więzienie</option>
            <option value='Więzienie i grzywa'>Więzienie i grzywna</option>
          </select>
        

<label className={styles.sentenceLength}>
<input
type="number"
placeholder="Długość wyroku"
name="sentenceLength"
onChange={handleChange}
value={data.sentenceLength}
required
className={styles.input}
/>
Jednostka daty:
<select ref={sentenceSuffix} className={styles.selectSentenceSuffix} onChange={()=>{}}>
            <option value='d'>Dni</option>
            <option value='m'>Miesiące</option>
            <option value='l'>Lata</option>
          </select>

</label>
<input
type="number"
placeholder="Wielkość grzywny"
name="fineAmount"
onChange={handleChange}
value={data.fineAmount}
required
className={styles.input}
/>
{error && <div
className={styles.error_msg}>{error}</div>}
<button type="submit"
className={styles.green_btn}>
Zarejestruj się
</button>
</form>
</div>


);
};
export default AddOffense