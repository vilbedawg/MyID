export default function DashboardID(props) {
    return (
        <>
            <img src="./images/fourth.png"/>
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