import { Link } from 'react-router-dom';

export const Missing = () => {
  return (
    <div className="container" style={{gridColumn: '1/5', textAlign: 'center', gridRow: '3'}}>
        <h1>404 Sivua ei löytynyt</h1>
        <Link to='/'>Takaisin</Link>
    </div>
  )
}
