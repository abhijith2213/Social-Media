// import React, { useState } from "react";
// import {Link} from 'react-router-dom'
// import {useSelector } from "react-redux"
// import profile from "../../../assets/images/download.png"

// function ChangePassword() {

//   const PF = process.env.REACT_APP_PUBLIC_FOLDER

//     const userData = useSelector(state =>state.user)

//   return (
//     <>
//     <div className='w-full mt-10 sm:mt-16 sm:mx-4 md:mt-0 md:w-5/6  lg:w-3/4 lg:flex lg:justify-end bg-[#F3F2EF] max-h-screen overflow-y-auto no-scrollbar'>
//     <div class="h-full w-full">
 
//     <div class="border-b-2 block md:flex h-full py-10">
//    <div class="w-full md:w-1/4 p-4 sm:p-6 lg:p-8 bg-white rounded shadow-md">
//         <h2 className="text-xl mb-4 font-medium text-blue-500">EDIT PROFILE</h2>
//      <div className="flex flex-col gap-4">
//      <Link to={'/account/editProfile'}> <h2 className="cursor-pointer text-lg">Edit Details</h2></Link>
//     <Link to={'/account/changePassword'}><h2 className="cursor-pointer text-lg">Change password</h2></Link>
//      </div>
//    </div>
   
//    <div class="w-full md:w-3/4 p-8 bg-white lg:ml-4 shadow-md ">
//      <div class="rounded  shadow p-6">
//        <div class="pb-6">
//         <div className="flex items-center gap-6 mb-2">
//         <img id="showImage" class="max-w-xs w-24 h-24 items-center border rounded-full" src={userData?.profilePic? PF+userData.profilePic : profile} alt=""/>
//         <div className="block">
//         <label for="name" class="font-semibold text-gray-700 block pb-1 text-2xl">{userData.userName}</label>
//         </div>                                  
//         </div>
//          <div class="mb-2">
//             <label for="oldPassword" class="font-semibold text-gray-700 block pb-1">Old Password</label>
//            <input  name="oldPassword" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="password" />
//          </div>
//          <div class="mb-2">
//             <label for="userName" class="font-semibold text-gray-700 block pb-1">New Password</label>
//            <input  name="password" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="password"  />
//          </div>
//          <div class="mb-2">
//             <label for="userName" class="font-semibold text-gray-700 block pb-1">Confirm New Password</label>
//            <input  name="cpassword" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="password" />
//          </div>
//        </div>
//        <button type="button" class="text-white bg-blue-500  hover:bg-blue-600 focus:ring-4 block focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Change Password</button>
//        <span className="text-blue-400 cursor-pointer">Forgotten your Password?</span>
//      </div>
//    </div>

//  </div>

// </div>
//   </div>


//   </>
//   )
// }

// export default ChangePassword;
