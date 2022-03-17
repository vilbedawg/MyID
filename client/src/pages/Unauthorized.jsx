import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="container">
      <h1>Ei sallittu :D</h1>
      <Link to='/'>Takaisin</Link>
    </div>
  )
}
