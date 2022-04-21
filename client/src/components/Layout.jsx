import { Outlet } from "react-router"
import { Navbar } from '../components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <main>
      <Navbar />
        <div className="containerGrid">
          <Outlet />
        </div>
      <ToastContainer style={{position: 'absolute'}}/>
    </main>
  )
}
