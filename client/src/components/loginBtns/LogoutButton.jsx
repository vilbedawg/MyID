import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export const LogoutButton = () => {
  
  const navigate = useNavigate();
  const logout = useLogout();
  
  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <li>
      <button onClick={onLogout} className="logoutBtn">
        Kirjaudu ulos
      </button>
    </li>
  )
};
