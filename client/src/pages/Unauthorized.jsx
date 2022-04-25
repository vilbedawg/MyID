import { Link } from 'react-router-dom';

export const Unauthorized = () => {
  return (
    <div className="container" style={{gridColumn: '1/5', textAlign: 'center', gridRow: '3'}}>
      <h1>Ei sallittu :D</h1>
      <Link to='/'>Takaisin</Link>
    </div>
  )
}
