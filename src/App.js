import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import AddOffense from "./components/AddOffense"
import AddEntry from "./components/AddEntry"
import ShowOffenses from "./components/ShowOffenses"
import ShowEntries from "./components/ShowEntries"
import EditOffense from "./components/EditOffense"
import EditEntry from "./components/EditEntry"
import EnumeratedList from "./components/EnumeratedList"
import DetailsEntry from "./components/DetailsEntry"
function App() {
const user = localStorage.getItem("token")
return (
<Routes>
{!user && <Route path="*" element={<Navigate replace to="/login"/>}/>}
{user && <Route path="/" exact element={<Main />} />}
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
{user && <Route path="/addoffense" exact element={<AddOffense/>}/>}
{user &&<Route path="/addentry" exact element={<AddEntry/>}/>}
{user && <Route path="/showentries" exact element={<ShowEntries/>}/>}
{user && <Route path="/showoffenses" exact element={<ShowOffenses/>}/>}
{user && <Route path="/editoffense/:id" exact element={<EditOffense/>}/>}
{user && <Route path="/editentry/:id" exact element={<EditEntry/>}/>}
{user && <Route path="/enumeratedList" exact element={<EnumeratedList/>}/>}
{user && <Route path="/entryDetails/:id" exact element={<DetailsEntry/>}/>}
<Route path="/" element={<Navigate replace to="/login" />} />
</Routes>
)
}
export default App