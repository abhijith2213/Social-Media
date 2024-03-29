import "./App.css"
import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"

import LoadingOverlay from "react-loading-overlay-ts"
import HashLoader from "react-spinners/HashLoader"

/* ------------------------------ PAGE IMPORTS ------------------------------ */

// Redux components
import store from "./Redux/User/Store"


import AdminStructure from "./Pages/Admin/AdminStructure/AdminStructure"
// PROTECTED ROUTE

import ProtectedRoutes from "./Utils/ProtectedRoutes"

// ERROR PAGE
const ErrorPage = lazy(()=>import ("./Pages/ErrorPage/ErrorPage")) 

// ADMIN
const AdminLoginPage = lazy(() => import("./Pages/Admin/AdminLogin/AdminLoginPage"))
const AdminDashboard = lazy(() => import("./Components/Admin/AdminDashboard/AdminDashboard"))
const UserManagement = lazy(() => import("./Components/Admin/UserManagement/UserManagement"))
const PostManagement = lazy(() => import("./Components/Admin/PostManagement/PostManagement"))
const JobManagement = lazy(() => import("./Components/Admin/Job Management/JobManagement"))
// CLIENT

const LandingPage = lazy(() => import("./Pages/User/LandingPage/LandingPage"))
const SignupPage = lazy(() => import("./Pages/User/SignUp/SignupPage"))
const SigninPage = lazy(() => import("./Pages/User/Signin/SigninPage"))
const HomePage = lazy(() => import("./Pages/User/Home/HomePage"))
const ChatPage = lazy(() => import("./Pages/User/ChatPage/ChatPage"))
const UserProfilePage = lazy(() => import("./Pages/User/UserProfile/UserProfilePage"))
const EditProfilePage = lazy(() => import("./Pages/User/EditProfilePage/EditProfilePage"))
const NotificationPage = lazy(() => import("./Pages/User/NotificationPage/NotificationPage"))
const JobsPage = lazy(() => import("./Pages/User/JobsPage/JobsPage"))
const ForgotPassword = lazy(() => import("./Components/User/ForgotPassword/ForgotPassword"))
const ResetPassword = lazy(() => import("./Components/User/ForgotPassword/ResetPassword"))

function App() {
   const isActive = true
   return (
      <div className='App'>
         <Router>
            {/* USER */}
            <Suspense
               fallback={
                  <div className=' absolute w-full h-full backdrop-blur-sm  flex items-center justify-center'>
                     <LoadingOverlay
                        active={isActive}
                        spinner={<HashLoader color={"#146CF0"} />}
                        text='Please Wait !'
                     ></LoadingOverlay>
                  </div>
               }>
               <Provider store={store}>
                  <Routes>
                     <Route path='/' exact element={<LandingPage />}></Route>
                     <Route path='/create_account' element={<SignupPage />}></Route>
                     <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
                     <Route path='/forgotPassword/:token' element={<ResetPassword />}></Route>
                     <Route path='/signin' element={<SigninPage />}></Route>

                     <Route element={<ProtectedRoutes />}>
                        <Route path='/home' element={<HomePage />}></Route>
                        <Route path='/profile/:userName' element={<UserProfilePage />}></Route>
                        <Route path='/myprofile' element={<UserProfilePage />}></Route>
                        <Route path='/message' element={<ChatPage />}></Route>
                        <Route path='/notifications' element={<NotificationPage />}></Route>
                        <Route path='/works' element={<JobsPage />}></Route>
                        <Route path='/account/editProfile' element={<EditProfilePage />}></Route>
                     </Route>

                     <Route path='/admin_login' element={<AdminLoginPage />}/>
                     <Route path='/admin' element={<AdminStructure />}>
                        {/* <Route path='admin_panel' element={<AdminDashboard />}/> */}
                        <Route path='user_management' element={<UserManagement />}/>
                        <Route path='post_management' element={<PostManagement />}/>
                        <Route path='job_management' element={<JobManagement />}/>
                     </Route>

                     <Route path="*" element={<ErrorPage/>}/>
                  </Routes>
               </Provider>
            </Suspense>
         </Router>
      </div>
   )
}

export default App
