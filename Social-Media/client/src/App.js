import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import {Provider } from 'react-redux'

/* ------------------------------ PAGE IMPORTS ------------------------------ */

// Redux components 
import store from './Redux/User/Store'

// SOCKET CONTEXT 
import { SocketContext,socket } from './Context/socketContext';

// ERROR PAGE 
import ErrorPage from './Pages/ErrorPage/ErrorPage';


// CLIENT 

import LandingPage from './Pages/User/LandingPage/LandingPage';
import SignupPage from './Pages/User/SignUp/SignupPage';
import SigninPage from './Pages/User/Signin/SigninPage';
import HomePage from './Pages/User/Home/HomePage';
import ChatPage from './Pages/User/ChatPage/ChatPage';
import UserProfilePage from './Pages/User/UserProfile/UserProfilePage';
import EditProfilePage from './Pages/User/EditProfilePage/EditProfilePage';
import ChangePasswordPage from './Pages/User/EditProfilePage/ChangePasswordPage';
import NotificationPage from './Pages/User/NotificationPage/NotificationPage';
import JobsPage from './Pages/User/JobsPage/JobsPage';


// ADMIN 

import AdminLoginPage from './Pages/Admin/AdminLogin/AdminLoginPage';
import AdminDashboard from './Components/Admin/AdminDashboard/AdminDashboard';
import UserManagement from './Components/Admin/UserManagement/UserManagement';
import AdminStructure from './Pages/Admin/AdminStructure/AdminStructure';
import PostManagement from './Components/Admin/PostManagement/PostManagement';
import JobManagement from './Components/Admin/Job Management/JobManagement';




function App() {

  const currentUser = localStorage.getItem('userToken')

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/signin'/>
    }
    return children
  }



  return (
    <div className='App'>
      <Router>

        {/* USER */}
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/create_account' element={<SignupPage/>}></Route>
        </Routes>
        <SocketContext.Provider value={socket}>
          <Provider store={store}>
        <Routes>        
          <Route path='/signin' element={<SigninPage/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/profile/:userName' element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}></Route>
          <Route path='/myprofile' element={<ProtectedRoute><UserProfilePage/></ProtectedRoute>}></Route>
          <Route path='/message' element={<ChatPage/>}></Route>
          <Route path='/notifications' element={<ProtectedRoute><NotificationPage/></ProtectedRoute>}></Route>
          <Route path='/works' element={<ProtectedRoute><JobsPage/></ProtectedRoute>}></Route>
          <Route path='/account/editProfile' element={<ProtectedRoute><EditProfilePage/></ProtectedRoute>}></Route>
          <Route path='/account/changePassword' element={<ProtectedRoute><ChangePasswordPage/></ProtectedRoute>}></Route>
        </Routes>
          </Provider>
          </SocketContext.Provider>
        {/* ADMIN */}

        <Routes>
          <Route path='/admin_login' element={<AdminLoginPage/>}></Route>
          <Route path='/admin' element={<AdminStructure/>}>
          <Route path='/admin/admin_panel' element={<AdminDashboard/>}></Route>
          <Route path='/admin/user_management' element={<UserManagement/>}></Route>
          <Route path='/admin/post_management' element={<PostManagement/>}></Route>
          <Route path='/admin/job_management' element={<JobManagement/>}></Route>
          </Route>
        </Routes>

        {/* Error Page  */}

        {/* <Routes>
          <Route path='/m*' element={<ErrorPage/>}></Route>
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
