import { Link } from 'react-router-dom';

export const Missing = () => {
  return (
    <div className="missing">
    <br />
    <br />
        <h1>404</h1>
        <h3>Sivua ei löytynyt</h3>
        <Link to='/'>Takaisin</Link>
    </div>
  )
}
