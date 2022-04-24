import { Outlet } from "react-router"
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Footer } from "./Footer";

export const Layout = () => {
  return (
    <main style={{height: '100%'}}>
      <Navbar />
        <div className="containerGrid">
          <Outlet />
        </div>
      <ToastContainer style={{position: 'absolute'}}/>
    </main>
  )
}
