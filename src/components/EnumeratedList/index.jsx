import { useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
import { useEffect } from "react"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}
const EnumeratedList = () => {
    const [foundEntries, setFoundEntries] = useState(false)
    const [entries, setEntries] = useState({})
    const [offenses, setOffenses] = useState({})
    useEffect(() => {
        axios.get("http://localhost:8080/api/offenses").then((response) => {
            setOffenses(response.data)

        })
        axios.get("http://localhost:8080/api/entries").then((response) => {

            setEntries(response.data)
            setFoundEntries(true)
        })
    }, []);

    //getEntries()
    return (foundEntries && <div>
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
            </button></nav><div className={styles.main_container}>
                <div className={styles.lists}>
            {
                offenses.length > 0 && offenses.map((off, i) => {
                    return( <ul> <h2>{off.name}:</h2>
                    {entries.map((entry, j) => 
                    off.name === entry.offense && 
                         <Link to={{
                            pathname: "/entryDetails/" + entry["_id"], state: { id: entry["_id"] }
                        }}>
                            <li>
                               {entry["firstName"] + " "} 
                                
                                {entry["surname"] +""}
                            </li>
                        </Link>
                        
                    )}</ul>)
                })
            }</div>
    </div></div>);
};
export default EnumeratedList