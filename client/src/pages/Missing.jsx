import { Link } from 'react-router-dom';

export const Missing = () => {
  return (
    <div className="missing">
    <br />
    <br />
        <h1>404 Sivua ei löytynyt</h1>
        <Link to='/'>Takaisin</Link>
    </div>
  )
}
