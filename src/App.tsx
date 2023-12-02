import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/auth/Login'
import Sign_up from './pages/auth/Sign_up'
import Auth_layout from './layout/auth/Auth_layout'
import Error404 from './pages/standar/Error404'
import Edit_Account from './pages/auth/Edit_account'
import Home from './pages/standar/Home'
import { ToastContainer } from 'react-toastify';
import { store } from './store/store'
import { Provider } from 'react-redux';
import Dashboard_layout from './layout/dashboard/Dashboard_layout'
import Dashboard_MyRutines from './pages/dashboard/Dashboard_MyRutines'
import Dashboard_create_routine from './pages/dashboard/Dashboard_create_routine'
import Dashboard_routine from './pages/dashboard/Dashboard_routine'
function App() {

  return (
    <>
      <Provider store={store} >
        <Router>
          <Routes>
            
            {/* Dashboard Routes */}
            <Route path='/dashboard' element={<Dashboard_layout />}>
              <Route index element={<Dashboard_MyRutines />} />
              <Route path='/dashboard/myRoutines' element={<Dashboard_MyRutines />} />
              <Route path='/dashboard/routine/:routine' element={<Dashboard_routine />}> </Route>
              <Route path='/dashboard/edit-account' element={<Edit_Account />}> </Route>
              <Route path='/dashboard/create-routine' element={<Dashboard_create_routine />}> </Route>
            </Route>

            <Route path='/' element={<Auth_layout />}>
              <Route index element={<Home />}></Route>
              <Route path='/login' Component={Login}> </Route>
              <Route path='/sign-up' Component={Sign_up}> </Route>
            </Route>
            <Route path='*' element={<Error404 />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default App
