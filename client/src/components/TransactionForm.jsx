import { KelaForm } from "./transactionForms/KelaForm"
import { DriverForm } from "./transactionForms/DriverForm"
import { PassportForm } from "./transactionForms/PassportForm"

export default function TransactionForm({data, type}) {

  const ObjectKeys = ({item, i}) => {
    return item[0] !== 'picture' ? (
      <div className="form-row" key={i}>
        <p>{item[0]}</p>
        <input value={item[1]} readOnly className="form-input"/>
      </div>
    )
    :
    null
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await updateData
  }

  const updateData = async (data) => {
    console.log(data)
  }
  
  return (
    <form className="transactions-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        {Object.entries(data).map((item, i) => <ObjectKeys item={item} key={i}/>)}
        {type === 'Ajokortti' && <DriverForm imagePath={data.picture} submit={updateData}/>}
        {type === 'Kelakortti' && <KelaForm imagePath={data.picture}/>}
        {type === 'Passi' && <PassportForm imagePath={data.picture}/>}
      </div>
    </form>
  )
}


