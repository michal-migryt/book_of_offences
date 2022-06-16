import styles from "./styles.module.css"
import { Link, useNavigate } from "react-router-dom"
const Main = () => {
const handleLogout = () => {
localStorage.removeItem("token")
window.location.reload()
}

return (
<div className={styles.main_container}>
<nav className={styles.navbar}>
<h1>Kartoteka kryminalno-wykroczeniowa</h1>
<button className={styles.white_btn} onClick={handleLogout}>
Wyloguj się
</button>
</nav>
<Link to="/showoffenses">
<button className={styles.green_btn}>
    Lista przewinień
</button>
</Link>

<Link to="/showentries">
<button className={styles.green_btn}>
    Lista wpisów
</button>
</Link>
<Link to="/enumeratedList">
<button className={styles.green_btn}>
    Lista z podziałem
</button>
</Link>
</div>
)
}
export default Main