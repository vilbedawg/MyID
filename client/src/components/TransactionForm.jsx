
export default function TransactionForm({data, type}) {

  const ObjectKeys = ({item, i}) => {
    return (
      <div className="form-row" key={i}>
        <p>{item[0]}</p>
        <input value={item[1]} readOnly className="form-input"/>
      </div>
    )
  }

  return (
    <>
      <div className="form-group">
        {Object.entries(data.body).map((item, i) => <ObjectKeys item={item} key={i}/>)}
        {type === 'Ajokortti' ? console.log(type) : console.log('Not')}
      </div>

    </>
  )
}


