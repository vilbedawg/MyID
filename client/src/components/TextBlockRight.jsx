import react from "react";

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
        </div>
    )
};