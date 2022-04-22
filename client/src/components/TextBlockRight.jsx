import { Link } from "react-router-dom"

export default function TextBlockRight(props) {
    return (
        <div className="textBlockRight">
            <img src={props.path} />
            <div className="textBlockBody">
                <h1>
                    {props.header}
                </h1>
                <p>
                    {props.body}
                </p>
            </div>
            {props.link ? 
            <Link to={props.link}>{props.linktext}</Link>
            : null}
        </div>
    )
};