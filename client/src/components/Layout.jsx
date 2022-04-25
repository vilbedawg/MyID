import { Outlet } from "react-router"
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <main style={{height: '100%'}} className="containerGrid">
      <Navbar />
          <Outlet />
      <ToastContainer style={{position: 'absolute'}}/>
      <Footer />
    </main>
  )
}
