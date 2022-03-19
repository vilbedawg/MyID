import { Link } from "react-router-dom";
import { LoginAndRegisterButton } from "./LoginAndRegisterButton";
import { LogoutButton } from "./LogoutButton";
import useAuth from "../hooks/useAuth";

export const Navbar = () => {
  const { auth } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            {
              auth?.accessToken ? (
                <>
                  <li className="nav-item active">
                    <Link to="/" className="nav-link">
                      Etusivu
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link to="/transactions" className="nav-link">
                      Lisää uusi
                    </Link>
                  </li>
                </>
              ) : null
            }

            {/* passi */}
            {
              auth?.roles?.includes(5024) ? (
              <li className="nav-item active">
                <Link to="/blocks" className="nav-link">
                  Admin
                </Link>
              </li>
              ) : null
            }
            <li className="nav-item active">
              <Link to="/about" className="nav-link">
                Miten sovellus toimii
              </Link>
            </li>
          </ul>
        </div>
        {
          !auth?.accessToken 
          ? <LoginAndRegisterButton />
          : <LogoutButton />
        }
      </nav>
    </>
  );
};
