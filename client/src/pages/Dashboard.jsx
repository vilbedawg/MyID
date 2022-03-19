import { User } from "../components/User";
import { ValidateBlockchain } from "../components/ValidateBlockchain";

export default function Dashboard() {
  

  return (
    <div className='container'>
      <h1>MyID</h1>
      <p>Etusivu</p>
      <User />
      <ValidateBlockchain />
    </div>
  )
}
