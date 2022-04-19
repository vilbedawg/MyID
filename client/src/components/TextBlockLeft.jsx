import react from "react";

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
            <img src={props.path} />
        </div>
    )
};