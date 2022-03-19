import useAuth from "../hooks/useAuth"


export const About = () => {
  const {auth} = useAuth();
  return (
    <div className="container">
    <h1>About sivu</h1>
    {console.log(auth)}
    </div>
  )
}
