import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddOffense from "./components/AddOffense"
import AddEntry from "./components/AddEntry"
import ShowOffenses from "./components/ShowOffenses"
import ShowEntries from "./components/ShowEntries"
import EditOffense from "./components/EditOffense"
function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/" element={<Navigate replace to="/login" />} />
<Route path="/addoffense" exact element={<AddOffense/>}/>
<Route path="/addentry" exact element={<AddEntry/>}/>
<Route path="/showentries" exact element={<ShowEntries/>}/>
<Route path="/showoffenses" exact element={<ShowOffenses/>}/>
<Route path="/editoffense/:id" exact element={<EditOffense/>}/>
</Routes>
)
}
export default App