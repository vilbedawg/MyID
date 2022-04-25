import { Link, useLocation } from "react-router-dom";
import { LoginAndRegisterButton } from "./loginBtns/LoginAndRegisterButton";
import { LogoutButton } from "./loginBtns/LogoutButton";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const from = location.pathname;

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <nav className="navbar">
          <ul className="navList">
            <li>
              <Link to="/"><h1 className="myidLogo">My<span>ID</span></h1></Link>
            </li>
            {
              auth?.accessToken ? (
                <>
                  <li>
                    <a><span style={{fontWeight: 'bold'}}>Hei</span> {`${auth.email}`}</a>
                  </li>
                  {
                    auth?.roles?.length <= 1 ? (
                      <li>
                        <Link to="/">Etusivu</Link>
                      </li>
                    )
                    : null
                  }
                </>
              ) : null
            }

            {/* passi */}
            {
              auth?.roles?.includes(5024) || auth?.roles?.includes(1922) || auth?.roles?.includes(1922) ? (
              <li>
                <Link to="/transactions">Admin</Link>
              </li>
              ) : null
            }
            {
              auth?.roles?.length <= 1 ? (
                
                <li>
                  <Link to="/about">Sovelluksen käyttö</Link>
                </li>
              )
              : null
            }
        
          </ul>
            
          {
          !auth?.accessToken 
          ? <LoginAndRegisterButton path={from}/>
          : <LogoutButton />
        }
      </nav>
    </>
  );
};
