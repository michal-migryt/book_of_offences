import { useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
import { useEffect } from "react"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}
const EditEntry = () => {
    /*const [data, setData] = useState({
        firstName: "",
        secondName: "",
        surname: "",
        offense: "",
    })
    */
    const [data, setData] = useState()
    const [backupData, setBackupData] = useState()
    const { id } = useParams("")
    console.log(id);
    const [offensesNames, setOffensesNames] = useState({ name: "" })
    const [foundEntry, setFoundEntry] = useState(false)
    const [foundNames, setFoundNames] = useState(false)
    const offenseRef = useRef("Kradzież")
    const getNames = async () =>{
        await axios.get("http://localhost:8080/api/offenses/names").then((response) => {
            setOffensesNames(response.data)
            setFoundNames(true)
            //console.log(offensesNames)
        })
    }
    //const offenseRef = useRef("Kradzież")
    const getEntry = async () =>{
        await axios.get("http://localhost:8080/api/entries/" + id).then((response) => {
            setData(response.data[0])
            setBackupData(response.data[0])
            setFoundEntry(true)
        })
    }
    if (!foundNames) { 
    getNames();
    }
    if(!foundEntry){
        getEntry();
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

            const url = "http://localhost:8080/api/entries/update/" + id
            const dbobj = {
                firstName: data.firstName,
                secondName: data.secondName,
                surname: data.surname,
                offense: data.offense
            }
            const { data: res } = await axios.post(url, dbobj)
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
    const cancelEdited = (e) => {
        e.preventDefault()
        setData(backupData)
    }
    
    return (foundNames &&  foundEntry && 
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.back_btn}>
                    <Link to="/showentries">
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
                        <select ref={offenseRef} value={data.offense} className={styles.select} onChange={(e) => { setData({ ...data, ["offense"]: e.target.value }) }}>
                            {offensesNames.map((v, i) => {
                                return <option>{v["name"]}</option>
                            })}
                        </select>
                    </label> : null
                }

                {error && <div
                    className={styles.error_msg}>{error}</div>}
                {success && <div
                    className={styles.success}>{success}</div>}
                    <div>
                <button type="submit" onClick={console.log(data)}
                    className={styles.green_btn}>
                    Edytuj wpis
                </button>
                    <button className={styles.green_btn} onClick={cancelEdited} > Cofnij zmiany</button></div>
            </form>
        </div>
    );
};
export default EditEntry