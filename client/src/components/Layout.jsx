import { Outlet } from "react-router"
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <main className="containerGrid">
      <Navbar />
      <Outlet />
      <ToastContainer style={{position: 'absolute'}}/>
    </main>
  )
}
