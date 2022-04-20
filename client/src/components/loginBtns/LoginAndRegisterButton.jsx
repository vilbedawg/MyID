import { Link } from "react-router-dom"

export const LoginAndRegisterButton = () => {
  return (
    <>
        <li>
          <Link to="/login">
            Kirjaudu sisään
          </Link>
        </li>
        <li>
          <Link to="/register">
            Rekisteröidy
          </Link>
        </li>
    </>
  )
}
