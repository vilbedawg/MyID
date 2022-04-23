import { useNavigate } from "react-router";

export const LoginAndRegisterButton = ({path}) => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    const location = e.target.getAttribute("name");
    
    if(location === 'login') {
      navigate('/login', {replace: true});
    } else {
      navigate('register', {replace: true});
    }
  }

  return (
    <>
        <div>
          <button 
            onClick={clickHandler} 
            name="login"  
            className={path !== '/login' ? 'logoutBtn' : 'logoutBtn  active'} 
            style={{margin: '10px'}}>
            Kirjaudu sisään
          </button>
          <button 
            onClick={clickHandler} 
            name="register" 
            className={path !== '/register' ? 'logoutBtn' : 'logoutBtn active'}
            style={{margin: '10px'}}>
            Rekisteröidy
          </button>
        </div>
    </>
  )
}
