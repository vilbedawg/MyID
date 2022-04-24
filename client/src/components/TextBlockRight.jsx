
export default function TextBlockRight(props) {
    return (
        <div className="textBlockRight" style={{borderBottom: props.last ? 'none' : '1px solid black'}}>
            <img src={props.path} alt="customimg" style={{width: props.last ? 'auto' : '500px'}}/>
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