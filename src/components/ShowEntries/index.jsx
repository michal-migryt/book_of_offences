import { useState, useRef} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
    }
const ShowEntries = () => {
    const [foundEntries, setFoundEntries] = useState(false)
    const [data, setData] = useState({
    })
    if(!foundEntries){
        axios.get("http://localhost:8080/api/entries").then((response) =>{
    setData(response.data)
    setFoundEntries(true)
})
    }
    return(foundEntries && <div className={styles.main_container}>
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
        <table>
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Drugie imię</th>
                    <th>Nazwisko</th>
                    <th>Wykroczenie</th>
                </tr>
            </thead>
            {foundEntries && 
                data.map((v,i)=>{
                    return <tr>
                        <th>{v["firstName"]}</th>
                        <th>{v["secondName"] ? v["secondName"] : "-"}</th>
                        <th>{v["surname"]}</th>
                        <th>{v["offense"]}</th>
                        <th><Link to={{pathname: "/editentry/"+v["_id"],state: {id: v["_id"]} // your data array of objects
  }}><button>Edytuj</button></Link></th>
                    </tr>
                })
            }
        </table>
        </div>);
};
export default ShowEntries