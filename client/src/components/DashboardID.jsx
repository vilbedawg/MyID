import { AcceptedIcon } from "./icons/Accepted-icon"
import { DeclinedIcon } from "./icons/Declined-icon"

export default function DashboardID(props) {
    return (
        <>
            {!props.accepted ? <AcceptedIcon /> : <DeclinedIcon />}
            <div className="dashboardID">
                <p>{props.ID}</p>
                <img src={props.path}/>
                <p>{props.name}</p>
                <p>{props.country}</p>
                <p>{props.bday}</p>
            </div>
        </>
    )
}