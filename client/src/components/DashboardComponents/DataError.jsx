import { DeclinedIcon } from "../../components/icons/Declined-icon";
import { toast } from "react-toastify";
import { useEffect } from "react";
export default function DataError (){
    useEffect(() => {
        toast.warn('Tiedostosi on viallinen');
    }, [])
    return(
        <div className="dashboardRight" style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
            <DeclinedIcon inValid={true}/>
            <h1>Käyttäjäsi tiedosto on virheellinen</h1>
            <h2>Ota yhteys viranomaiseen</h2>
        </div>
    )
}