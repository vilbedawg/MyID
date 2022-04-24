import { KelaForm } from "./transactionForms/KelaForm"
import { DriverForm } from "./transactionForms/DriverForm"
import { PassportForm } from "./transactionForms/PassportForm"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useParams } from "react-router";
import { toast } from "react-toastify";


export default function TransactionForm({data, type}) {
  const axiosPrivate = useAxiosPrivate();
  const params = useParams();

  const displayOnly = ['Tyyppi', 'Nimi', 'Syntymäaika', 'Henkilötunnus', 'Maa', 'Postitoimipaikka', 'Osoite'];

  const ObjectKeys = ({item, i}) => {
    if (item[0] === 'picture') return null

    const wantToDisplay = displayOnly.some(x => x === item[0]);

    if(!wantToDisplay) return null;
    
    return  (
      <div className="form-row" style={{opacity: '.5'}} key={i}>
        <p>{item[0]}</p>
        <input value={item[1]} readOnly className="form-input"/>
      </div>
    )
  }

  const updateData = async (data) => {
    const valid = data.valid;
    const body = data.data;
     try {
      const response = await axiosPrivate.post(`${process.env.REACT_APP_HANDLE}/${params.id}/${valid}`, body);
      console.log(response.data);
      toast.success(response.data)
    } catch (error) {
      toast.error(error.response.data?.message);
      toast.error(error.response.data);
    }
  }
  
  return (
    <div className="transactions-form" >
      <div className="form-group">
      
        {Object.entries(data).map((item, i) => <ObjectKeys item={item} key={i}/>)}

        {type === process.env.REACT_APP_AJOKORTTI && <DriverForm imagePath={data.picture} submit={updateData}/>}
        {type === process.env.REACT_APP_KELAKORTTI && <KelaForm imagePath={data.picture} submit={updateData}/>}
        {type === process.env.REACT_APP_PASSI && <PassportForm imagePath={data.picture} submit={updateData}/>}
      </div>
    </div>
  )
}


