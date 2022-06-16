import { useState, useRef} from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
    }
const ShowOffenses = () => {
    const [foundOffenses, setFoundOffenses] = useState(false)
    const [data, setData] = useState({
        name: "",
        punishment: "",
        sentenceLength: "",
        fineAmount: 0
    })
    const findOffenses = () =>{
    if(!foundOffenses){
        axios.get("http://localhost:8080/api/offenses").then((response) =>{
    setData(response.data)
    setFoundOffenses(true)
})
    }
    }
    findOffenses()
    return(foundOffenses && <div className={styles.form_container}>
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
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Rodzaj kary</th>
                    <th>Długość wyroku</th>
                    <th>Wielkość grzywny[zł]</th>
                </tr>
            </thead>
            {foundOffenses && 
                data.map((v,i)=>{
                    let suffix = "", senLen=0, finalString="-"
                    if(v["sentenceLength"]){
                        suffix = v["sentenceLength"].slice(v["sentenceLength"].length-1)
                        senLen = parseInt(v["sentenceLength"])
                        switch (suffix) {
                            case "y":
                                if(senLen === 1){
                                    finalString = "rok"
                                break;}
                                if(senLen % 10 > 1 && senLen % 10 < 5){
                                    finalString = senLen.toString() +" lata"
                                    break;
                                }
                                finalString = senLen.toString() + " lat"
                                break;
                            case "m":
                                if(senLen === 1){
                                    finalString = "miesiąc"
                                break;}
                                if(senLen % 10 > 1 && senLen % 10 < 5){
                                    finalString = senLen.toString() +" miesiące"
                                    break;
                                }
                                finalString = senLen.toString() + " miesięcy"
                                break;
                            case "d":
                                if(senLen === 1){
                                    finalString = "dzień"
                                break;}
                                finalString = senLen.toString() + " dni"
                                break;
                            case "h":
                                if(senLen === 1){
                                    finalString = "godzina"
                                break;
                                }
                                finalString = senLen.toString() + " godzin"
                                break;
                            default:
                                break;
                        }


                    }
                    return <tr>
                        <th>{v["name"]}</th>
                        <th>{v["punishment"]}</th>
                        <th>{finalString}</th>
                        <th>{v["fineAmount"] ? v["fineAmount"] : "-"}</th>
                        <th><Link to={{pathname: "/editoffense/"+v["_id"],state: {id: v["_id"]}
  }}><button>Edytuj</button></Link></th>
  <th><button onClick={()=>{axios.delete("http://localhost:8080/api/offenses/"+ v["_id"]).then(setFoundOffenses(false), findOffenses(), axios.delete("http://localhost:8080/api/entries/deletewithoffense/"+ v["name"]))}}>Usun</button></th>
                    </tr>
                })
            }
        </table>
        <Link to="/addoffense">
<button className={styles.green_btn}>
    Dodaj przewinienie
</button>
</Link>
        </div>);
};
export default ShowOffenses