import { useState } from "react"
import AddDriverLisence from "../components/AddDriverlicense"
import AddPassport from "../components/AddPassport"
import AddKela from "../components/AddKela"

export default function Addnew(){

    const [state, setState] = useState("Passi")

    const changeState = (newState) => {
        setState(newState)
        console.log(newState)
    }

    return (
        <>
        <div className="navbarPlaceholder"></div>
        <div className="addNew">
            <select className="addNewSelect" onChange={(event) => changeState(event.target.value)}>
                <option default hidden>Valitse uusi ID</option>
                <option value="Passi">Passi</option>
                <option value="Ajokortti">Ajokortti</option>
                <option value="Kelakortti">Kelakortti</option>
            </select>
            <hr></hr>
            {state === "Passi" && <AddPassport/>}
            {state === "Ajokortti" && <AddDriverLisence />}
            {state === "Kelakortti" && <AddKela />}
        </div>
        </>
    )
}