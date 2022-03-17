import { Link } from "react-router-dom"

export const LoginAndRegisterButton = () => {
  return (
    <div style={{ display: "flex" }}>
        <li className="nav-item active">
          <Link to="/login" className="nav-link">
            Kirjaudu sisään
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/register" className="nav-link">
            Rekisteröidy
          </Link>
        </li>
    </div>
  )
}
