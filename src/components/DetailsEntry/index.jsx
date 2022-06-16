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
const DetailsEntry = () => {

    const [data, setData] = useState()
    const [backupData, setBackupData] = useState()
    const { id } = useParams("")
    const [offensesNames, setOffensesNames] = useState({ name: "" })
    const [foundEntry, setFoundEntry] = useState(false)
    const [foundNames, setFoundNames] = useState(false)

    const getEntry = async () =>{
        await axios.get("http://localhost:8080/api/entries/" + id).then((response) => {
            setData(response.data[0])
            setFoundEntry(true)
        })
    }
    useEffect(()=>{
        getEntry()
    })
    
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    return (foundEntry &&
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.back_btn}>
                    <Link to="/enumeratedList">
                        <img className={styles.img} src={arrow_back}>
                        </img>
                    </Link>
                </button>
                <h1>Kartoteka kryminalno-wykroczeniowa</h1>

                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj się
                </button></nav>
            <div className={styles.form_container}>
            <div className={styles.details}>
                <h1>Szczegóły wpisu</h1>
                
                <label className={styles.label}>
                    Imię sprawcy:
                    {" " + data.firstName}
                </label>
                {data.secondName != "" &&
                <label className={styles.label}>
                    Drugie imię sprawcy:
                    {" " + data.secondName}
                </label>
}
                <label className={styles.label}>
                    Nazwisko sprawcy:
                    {" " + data.surname}
                </label>

                    <label className={styles.label}>

                        Rodzaj przewinienia:
                        {" " + data.offense}
                    </label>
                    </div>

                {error && <div
                    className={styles.error_msg}>{error}</div>}
                {success && <div
                    className={styles.success}>{success}</div>}
                    
            </div>
        </div>
    );
};
export default DetailsEntry