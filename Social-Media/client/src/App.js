import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Provider, provider } from 'react-redux'
/* ------------------------------ PAGE IMPORTS ------------------------------ */

// Redux components 
import store from './Redux/User/Store'

// CLIENT 

import LandingPage from './Pages/User/LandingPage/LandingPage';
import SignupPage from './Pages/User/SignUp/SignupPage';
import SigninPage from './Pages/User/Signin/SigninPage';
import HomePage from './Pages/User/Home/HomePage';


// ADMIN 

import AdminLoginPage from './Pages/Admin/AdminLogin/AdminLoginPage';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import UserManagement from './Components/Admin/UserManagement/UserManagement';
import AdminStructure from './Pages/Admin/AdminStructure/AdminStructure';



function App() {
  return (
    <div className='App'>
      <Router>

        {/* USER */}
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/create_account' element={<SignupPage/>}></Route>
        </Routes>

          <Provider store={store}>
        <Routes>        
          <Route path='/signin' element={<SigninPage/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
        </Routes>
          </Provider>

        {/* ADMIN */}

        <Routes>
          <Route path='/admin_login' element={<AdminLoginPage/>}></Route>
          <Route path='/admin' element={<AdminStructure/>}>
          <Route path='/admin/admin_panel' element={<AdminDashboard/>}></Route>
          <Route path='/admin/user_management' element={<UserManagement/>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;