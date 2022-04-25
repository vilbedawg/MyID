import { AcceptedIcon } from "./icons/Accepted-icon"
import { DeclinedIcon } from "./icons/Declined-icon"

export default function DashboardID(props) {
    const displayFirst = ['Nimi', 'Syntymäaika', 'Henkilötunnus', 'Maa', 'Tyyppi', 'picture'];

    const DisplayedData = ({data}) => (
        Object.entries(data).map((item, index) => {
            const contains = displayFirst.includes(item[0]);
            if(contains) {
                return (
                    <div key={index}>
                        <p>{item[1]}</p>
                        <p>{item[0]}</p>
                    </div>
                )
            }
            else {
                return (
                    <div key={index}>
                        <p>{item[1]}</p>
                        <p>{item[0]}</p>
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
                    <p>{}</p>
                </div>
                <div className="container-items Below">
                    <DisplayedData data={props.data}/>
                </div>
            </div>
        </>
    )
}