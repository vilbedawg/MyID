import { Link } from "react-router-dom";

export default function TextBlockLeft(props) {
    return (
        <div className="textBlockLeft">
            <div className="textBlockBody">
                <h1>
                    {props.header}
                </h1>
                <p>
                    {props.body}
                </p>
            </div>
            <img src={props.path} alt="customimg" />
            {props.link ? 
            <Link to={props.link}>{props.linktext}</Link>
            : null}
        </div>
    )
};