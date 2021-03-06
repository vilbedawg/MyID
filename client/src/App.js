import { Route, Routes } from "react-router-dom";
import Addnew from './pages/Addnew';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Admin } from './pages/Admin';
import Dashboard from './pages/Dashboard';
import { Layout } from './components/Layout';
import { Missing } from './pages/Missing';
import RequireAuth from './components/RequireAuth';
import { Unauthorized } from './pages/Unauthorized';
import PersistLogin from './components/PersistentLogin';
import { ViewTransaction } from './pages/ViewTransaction';
import About from './pages/About';
import { LoginAuth } from "./pages/LoginAuth";
import NewIDSent from "./pages/NewIDSent";
import AboutApp from "./pages/AboutApp";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* protected routes for USERS */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/check" element={<LoginAuth />} />
            <Route path="/addnew" element={<Addnew />} />
            <Route path="/NewIDSent" element={<NewIDSent />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/about/how" exact element={<AboutApp />} />
          </Route>

          {/* protected routes for ADMINS */}
          <Route element={<RequireAuth allowedRoles={[5024, 1922, 3033]} />}>
            <Route path="/transactions" element={<Admin />} />
            <Route path="/transactions/:id" element={<ViewTransaction />} />
          </Route>
        </Route>

        {/* everything else */}
        <Route path="*" element={<Missing />} />

      </Route>
    </Routes>
  );
}

export default App;
