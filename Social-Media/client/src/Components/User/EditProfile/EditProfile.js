import React, { useState } from "react";
import {useSelector } from "react-redux"
import {Link} from 'react-router-dom'

function EditProfile() {

    const userData = useSelector(state =>state.user)
    const [showModal,setShowModal] = useState(false)

    /* ----------------------- UPLOAD NEW PROFILE PICTURE ----------------------- */

    const [newProfile, setNewProfile] = useState('')

    const handleNewProfilePic = () =>{

    }

  return (
    <>
    <div className='w-full  mt-10 sm:mt-16 sm:mx-4 md:mt-0 md:w-5/6  lg:w-3/4 lg:flex lg:justify-end bg-[#F3F2EF] max-h-screen overflow-y-auto no-scrollbar'>
    <div class="h-full w-full ">
 
    <div class="border-b-2 block md:flex h-full py-10">
   <div class="w-full md:w-1/4 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
        <h2 className="text-xl mb-4 font-medium text-blue-500">EDIT PROFILE</h2>
     <div className="flex flex-col gap-4">
       <Link to={'/account/editProfile'}> <h2 className="cursor-pointer text-lg">Edit Details</h2></Link>
        <Link to={'/account/changePassword'}><h2 className="cursor-pointer text-lg">Change password</h2></Link>
     </div>
   </div>
   
   <div class="w-full md:w-3/4 p-8 bg-white lg:ml-4 shadow-md">
     <div class="rounded  shadow p-6">
       <div class="pb-6">
        <div className="flex items-center gap-6 mb-2">
        <img id="showImage" class="max-w-xs w-24 h-24 items-center border rounded-full" src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" alt=""/>
        <div className="block">
        <label for="name" class="font-semibold text-gray-700 block pb-1 text-xl">{userData.userName}</label>
        <label for="name" class="font-semibold text-blue-400 block pb-1" onClick={(e)=>setShowModal(true)}>Change Profile Photo</label>
        </div>                                  
        </div>
         <div class="mb-2">
            <label for="fullName" class="font-semibold text-gray-700 block pb-1">Full Name</label>
           <input  name="fullName" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="text" value={userData?.fullName} />
         </div>
         <div class="mb-2">
            <label for="userName" class="font-semibold text-gray-700 block pb-1">user Name</label>
           <input  name="userName" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="text"  value={userData?.userName}/>
         </div>
         <div class="mb-2">
           <label for="bio" class="font-semibold text-gray-700 block pb-1">About You</label>
           <textarea  name="bio" class="border rounded focus:outline-none rounded-r px-4 py-2 w-full" type="text"  value={userData?.bio}/>
         </div>
       </div>
       <button type="button" class="text-white bg-blue-600  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Submit</button>
     </div>
   </div>

 </div>

</div>
  </div>
  {showModal ?  <>
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-xl font-semibold">
              Change Profile Photo
            </h3>

          </div>
          {/*body*/}

          <div className="flex cursor-pointer  items-center justify-center p-3 border-t border-solid border-slate-200 rounded-b">
                 <p className='font-medium text-sm text-red-500'>Remove Current Profile Pic</p>
         </div>
         <div className="flex cursor-pointer  items-center justify-center p-3 border-t border-solid border-slate-200 rounded-b" onClick={handleNewProfilePic}>
         <label htmlFor="img-upload" className="cursor-pointer">
                 <p className='font-medium text-sm' >Upload New Photo</p>
          </label>  
                 <input type="file" name="profile" id="img-upload" onChange={(e)=>setNewProfile(e.target.files[0])}  className="hidden"/>
            </div>
          <div className="flex cursor-pointer  items-center justify-center p-3 border-t border-solid border-slate-200 rounded-b">
            <button className="text-gray-700 text-center background-transparent font-medium  px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </> : null}
  </>
  )
}

export default EditProfile;
