
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './CITIZEN/CHome.jsx'
import CLogin from './CITIZEN/CLogin.jsx'
import CHome from './CITIZEN/CHome.jsx'
import Login from './Login.jsx'
import CMakeComplain from './CITIZEN/CMakeComplain.jsx'
import EHome from './EMPLOYEE/EHome.jsx'
import ERegister from './EMPLOYEE/ERegister.jsx'
import EComplain from './EMPLOYEE/EComplain.jsx'
import Navbar from './EMPLOYEE/Navbar.jsx'
import EHandling from './EMPLOYEE/EHandling.jsx'
import ViewComplaints from './CITIZEN/ViewComplaints.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/cregister" element={<CLogin />}></Route>
      <Route path="/chome/:id" element={<CHome />}></Route>
      <Route path="/cmakecomplain/:id" element={<CMakeComplain />}></Route>
      <Route path="/cviewcomplain/:id" element={<ViewComplaints />}></Route>
      <Route path="/ehome/:id" element={<EHome />}></Route>
      <Route path="/eregister" element={<ERegister />}></Route>
      <Route path="/ecomplainreq/:id" element={<EComplain />}></Route>
      <Route path="/ecomplainhandling/:id" element={<EHandling />}></Route>
    </Routes>
  </BrowserRouter>

  )
}

export default App
