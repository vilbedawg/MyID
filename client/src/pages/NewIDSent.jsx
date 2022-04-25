import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function NewIDSent () {
    const [seconds, setSeconds] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => {
                setSeconds(seconds - 1)
            }, 1000);
        }
        else {
            navigate("/")
        }
    })

    return (
        <div className="newIDSent">
                <img src="./images/fourth.png" alt="idsent_img"/>
                <h1>Hakemus on lähetetty tarkistettavaksi!</h1>
                <br/>
                <br/>
                <br/>
                <p>Uudelleen ohjataan takaisin {`${seconds}`} etusivulle</p>
        </div>
    )
}