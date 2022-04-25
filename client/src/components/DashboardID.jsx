import { AcceptedIcon } from "./icons/Accepted-icon"
import { DeclinedIcon } from "./icons/Declined-icon"

export default function DashboardID(props) {
    const displayFirst = ['Nimi', 'Syntymäaika', 'Henkilötunnus', 'Maa', 'Tyyppi', 'picture'];

    const DisplayedData = ({data}) => (
        Object.entries(data).map((item, index) => {
            const contains = displayFirst.includes(item[0]);
            if(contains) {
                if(item[0] === "picture"){
                    return null
                }
                return (
                    <div key={index} className="IDItems">
                        <p>{item[0]}:</p>
                        <p>{item[1]}</p>
                    </div>
                )
            }
            else {
                return (
                    <div key={index} className="IDItems">
                        <p>{item[0]}:</p>
                        <p>{item[1]}</p>
                    </div>
                )
            } 
        })
    )

  

    return (
        <>
            {props.data.accepted ? <AcceptedIcon /> : <DeclinedIcon />}
            <div className="dashboardID">
                <div className="container-items">
                    <img src={props.path}/>
                </div>
                <div className="container-items Below">
                    <DisplayedData data={props.data}/>
                </div>
            </div>
        </>
    )
}