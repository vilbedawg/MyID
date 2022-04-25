import { useState } from "react"
import AddDriverLisence from "../components/addNewCards/AddDriverlicense"
import AddPassport from "../components/addNewCards/AddPassport"
import AddKela from "../components/addNewCards/AddKela"
import Placehodler from "../components/addNewCards/Placeholder";


export default function Addnew(){

    const [state, setState] = useState("Default");
    const [isLoading, setIsLoading] = useState(false);

    const changeState = (newState) => {
        setState(newState)
    }

    const getMyCard = (value) => {

    }

    const GoTo = () => {

    }

    return (
           <div className="addNew">
                <select className="addNewSelect" onChange={(event) => changeState(event.target.value)}>
                    <option default hidden value="Default">Valitse uusi ID</option>
                    <option value="Passi">Passi</option>
                    <option value="Ajokortti">Ajokortti</option>
                    <option value="Kelakortti">Kelakortti</option>
                </select>
                {state === "Default" && <Placehodler />}
                {state === "Passi" && <AddPassport/>}
                {state === "Ajokortti" && <AddDriverLisence />}
                {state === "Kelakortti" && <AddKela />}
            </div>
    )
}