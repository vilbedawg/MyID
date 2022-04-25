import { Outlet } from "react-router"
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Footer } from "./Footer";
import Hamburger from "./Hamburger";
import MobileNavbar from "./MobileNavbar";
import useAuth from "../hooks/useAuth";

export const Layout = () => {
  const { auth } = useAuth();
  return (
    <>
    <Hamburger data={auth}/>
    <main style={{height: '100%'}} className="containerGrid">
      <MobileNavbar />
      <Navbar />
          <Outlet />
      <ToastContainer style={{position: 'absolute'}}/>
      <Footer />
    </main>
    </>
  )
}
