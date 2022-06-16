import { useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
    //window.location.reload()
}
const AddOffense = () => {
    const [data, setData] = useState({
        name: "",
        punishment: "",
        sentenceLength: 0,
        fineAmount: 0,
    })
    const punishmentRef = useRef()
    const sentenceSuffix = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [hideSentenceLen, setHideSentenceLen] = useState(true)
    const [hideFineAmount, setHideFineAmonunt] = useState(false)
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    function ManageBooleans() {
        if (punishmentRef.current.value !== "Grzywna")
            setHideSentenceLen(false)
        else
            setHideSentenceLen(true)
        if (punishmentRef.current.value !== "Prace społeczne" && punishmentRef.current.value !== "Więzienie")
            setHideFineAmonunt(false)
        else
            setHideFineAmonunt(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const tempSL = !hideSentenceLen ? data["sentenceLength"].toString() + sentenceSuffix.current.value : "";
            const tempFine = !hideFineAmount ? data["fineAmount"] : 0
            const dbobj = {
                name: data["name"],
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

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <button className={styles.back_btn}>
                    <Link to="/showoffenses">
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
                            <select ref={sentenceSuffix} className={styles.selectSentenceSuffix} onChange={() => { }}>
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
                    Dodaj przewinienie
                </button>
            </form>
        </div>


    );
};

export default AddOffense