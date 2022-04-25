

export const DeclinedIcon = ({inValid}) => {
  if (inValid) {
    return (
      <div className="blob-container larger">
        <div className="blob red">
          <i className="fa fa-times" aria-hidden="true" style={{transform: 'scale(1.2)'}}></i>
        </div>
      </div>
    )
  }
  return (
    <div className="blob-container">
      <div className="blob red">
        <i className="fa fa-times" aria-hidden="true" style={{transform: 'scale(1.2)'}}></i>
      </div>
    </div>
  )
}
