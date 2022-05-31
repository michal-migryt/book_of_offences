import styles from "./styles.module.css"
import { Link, useNavigate } from "react-router-dom"
const Main = () => {
const handleLogout = () => {
localStorage.removeItem("token")
window.location.reload()
}
const handleAddOffense = ()=>{

}
return (
<div className={styles.main_container}>
<nav className={styles.navbar}>
<h1>Kartoteka kryminalno-wykroczeniowa</h1>
<button className={styles.white_btn} onClick={handleLogout}>
Wyloguj się
</button>
</nav>
<Link to="/addoffense">
<button className={styles.green_btn} onClick={handleAddOffense}>
    Dodaj przewinienie
</button>
</Link>
<Link to="/showoffenses">
<button className={styles.green_btn} onClick={handleAddOffense}>
    Wyświetl listę przewinień
</button>
</Link>
<Link to="/addentry">
<button className={styles.green_btn} onClick={handleAddOffense}>
    Dodaj wpis
</button>
</Link>
<Link to="/showentries">
<button className={styles.green_btn} onClick={handleAddOffense}>
    Wyświetl listę wpisów
</button>
</Link>
</div>
)
}
export default Main