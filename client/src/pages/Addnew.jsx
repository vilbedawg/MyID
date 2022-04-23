import { useState } from "react"
import AddDriverLisence from "../components/addNewCards/AddDriverlicense"
import AddPassport from "../components/addNewCards/AddPassport"
import AddKela from "../components/addNewCards/AddKela"


export default function Addnew(){

    const [state, setState] = useState("Ajokortti");

    const changeState = (newState) => {
        setState(newState)
    }

    return (
        <div className="addNew">
            <select className="addNewSelect" onChange={(event) => changeState(event.target.value)}>
                <option default hidden>Valitse uusi ID</option>
                <option value="Passi">Passi</option>
                <option value="Ajokortti">Ajokortti</option>
                <option value="Kelakortti">Kelakortti</option>
            </select>
            {state === "Passi" && <AddPassport/>}
            {state === "Ajokortti" && <AddDriverLisence />}
            {state === "Kelakortti" && <AddKela />}
        </div>
    )
}