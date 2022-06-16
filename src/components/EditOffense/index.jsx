import { useState, useRef } from "react"
import axios from "axios"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import styles from "./styles.module.css"
import arrow_back from "../../images/back-button.png"
const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}

const EditOffense = () => {
    const [data, setData] = useState({
        name: "",
        punishment: "",
        sentenceLength: 0,
        fineAmount: 0,
        sentenceSuffix: "h"
    })
    const [editData, setEditData] = useState({
        _id: "",
        name: "",
        punishment: "",
        sentenceLength: 0,
        fineAmount: 0
    })
    const { id } = useParams("")
    console.log(id);
    const [foundOffense, setFoundOffense] = useState(false)
    const [didSetupForm, setDidSetupForm] = useState(false)
    //const punishmentRef = useRef("Grzywna")
    //const sentenceSuffix = useRef("h")

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [hideSentenceLen, setHideSentenceLen] = useState(false)
    const navigate = useNavigate()
    const [hideFineAmount, setHideFineAmonunt] = useState(false)
    const setupFormularz = () => {
        var nazwa = editData["name"], kara = editData["punishment"],
            dlugoscKary = editData["sentenceLength"], wielkoscGrzywny = editData["fineAmount"];
        //setData({ ...data, "_id": editData._id })
        setData({ ...data, ["name"]: nazwa })
        setData({ ...data, ["punishment"]: kara})
        //punishmentRef.current.value = kara;
        if (dlugoscKary != null && dlugoscKary.length > 0) {
            var suffix = dlugoscKary.slice(-1);
            setData({ ...data, ["sentenceSuffix"]: suffix})
            var dlKarytemp = parseInt(dlugoscKary);
            setData({ ...data, ["sentenceLength"]: dlKarytemp })
            console.log(data)
        }
        setData({ ...data, ["fineAmount"]: wielkoscGrzywny })
}
    const getOffense = async () => {
        await axios.get("http://localhost:8080/api/offenses/" + id).then((response) => {
            setEditData(response.data); setData({
                name: response.data.name,
                punishment: response.data.punishment,
                sentenceLength : parseInt(response.data.sentenceLength),
                fineAmount : response.data.fineAmount,
                sentenceSuffix: response.data.sentenceLength.slice(-1)
            }); setFoundOffense(true);
        })
        //setupFormularz();
        ManageBooleans();
    };
    const cancelEdited = async (e) => {
        e.preventDefault()
        setError("")
        setSuccess("")
        //setupFormularz();
        setData({
            name: editData.name,
            punishment: editData.punishment,
            sentenceLength : parseInt(editData.sentenceLength),
            fineAmount : editData.fineAmount,
            sentenceSuffix: editData.sentenceLength.slice(-1)
        })
        ManageBooleans();

    }
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })

    }
    const handlePunishmentChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        ManageBooleans(input.value)

    }
    function ManageBooleans(punishment) {
        if (punishment !== "Grzywna")
            setHideSentenceLen(false)
        else
            setHideSentenceLen(true)
        if (punishment !== "Prace społeczne" && punishment !== "Więzienie")
            setHideFineAmonunt(false)
        else
            setHideFineAmonunt(true)

    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const tempSL = !hideSentenceLen ? data["sentenceLength"].toString() + data.sentenceSuffix : "";
            const tempFine = !hideFineAmount ? data["fineAmount"] : 0
            const dbobj = {
                name: editData["name"],
                punishment: data.punishment,
                sentenceLength: tempSL,
                fineAmount: tempFine
            }
            const url = "http://localhost:8080/api/offenses/update/" + editData._id
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
    if (!foundOffense)
        getOffense()
    return (foundOffense &&
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
                    <select value={data.punishment} name="punishment" className={styles.select} onChange={handlePunishmentChange}>
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
                            <select value={data.sentenceSuffix} name="sentenceSuffix" className={styles.selectSentenceSuffix} onChange={handleChange}>
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
                <div>
                    <button type="submit"
                        className={styles.green_btn}>
                        Edytuj przewinienie
                    </button>
                    <button className={styles.green_btn} onClick={cancelEdited} > Cofnij zmiany</button>
                </div>
            </form>
        </div>


    );

};

export default EditOffense