
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Activate from './pages/auth/Activate'
import Rest_password_comfirmation from './pages/auth/Rest_password_comfirmation'
import Reset_password from './pages/auth/Reset_password'
import Login from './pages/auth/Login'
import Sign_up from './pages/auth/Sign_up'
import Auth_layout from './layout/auth/Auth_layout'
import Error404 from './pages/standar/Error404'
import Edit_Account from './pages/auth/Edit_account'
import Home from './pages/standar/Home'
import { ToastContainer, toast } from 'react-toastify';
import store from './store';
import { Provider } from 'react-redux';
import Dashboard from './pages/dashboard/Dashboard'
function App() {

  return (
    <>
    <Provider store={store} >
    <Router>
        <Routes>
        <Route path='/dashboard' Component={Dashboard}> </Route>
        <Route path='/home' Component={Home}> </Route>
          <Route path='/' element={<Auth_layout/>}>
            <Route index element={<Login/>}></Route>
            <Route path='/activate/:uid/:token' Component={Activate}> </Route>
            <Route path='/login' Component={Login}> </Route>
            <Route path='/password/reset/confirm/:uid/:token' Component={Rest_password_comfirmation}> </Route>
            <Route path='/rest-password' Component={Reset_password}> </Route>
            <Route path='/sign-up' Component={Sign_up}> </Route>
            <Route path='/edit-account' Component={Edit_Account}> </Route>
          </Route>
          
           <Route path='*' element={<Error404/>}/>
        </Routes>
    </Router>
    <ToastContainer />
    </Provider>
    </>
  )
}

export default App
