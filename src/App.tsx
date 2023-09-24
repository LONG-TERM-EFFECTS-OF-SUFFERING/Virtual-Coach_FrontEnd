import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Activate from './pages/auth/Activate'
import Rest_password_comfirmation from './pages/auth/Rest_password_comfirmation'
import Reset_password from './pages/auth/Reset_password'
import Login from './pages/auth/Login'
import Sign_up from './pages/auth/Sign_up'
import Auth_layout from './layout/auth/Auth_layout'
import Error404 from './pages/standar/Error404'
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/Header'
import EditAccount from './components/EditAccount'

function App() {

  return (
    <div className='text-3xl'>
      <Header></Header>
    </div>
  )
}

export default App
