import { Link } from "react-router-dom";
import { LoginAndRegisterButton } from "./loginBtns/LoginAndRegisterButton";
import { LogoutButton } from "./loginBtns/LogoutButton";
import useAuth from "../hooks/useAuth";

export const Navbar = () => {
  const { auth } = useAuth();
  return (
    <>
      <nav className="navbar">
          <ul>
            <li>
              <h1 className="myidLogo">My<span>ID</span></h1>
            </li>
            {
              auth?.accessToken ? (
                <>
                  <li>
                    <a>
                      {auth.email}
                    </a>
                  </li>
                  <li>
                    <Link to="/">
                      Etusivu
                    </Link>
                  </li>
                </>
              ) : null
            }

            {/* passi */}
            {
              auth?.roles?.includes(5024) || auth?.roles?.includes(1922) ? (
              <li>
                <Link to="/blocks">
                  Admin
                </Link>
              </li>
              ) : null
            }
            <li>
              <Link to="/about">
                Sovelluksen käyttö
              </Link>
            </li>
        {
          !auth?.accessToken 
          ? <LoginAndRegisterButton />
          : <LogoutButton />
        }
          </ul>
      </nav>
    </>
  );
};
