import React, { useState } from "react"
import { useSelector } from "react-redux"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify" //Toast
import "react-toastify/dist/ReactToastify.css" //Toast Css

// Assets
import profile from "../../../assets/images/download.png"
import { BsThreeDotsVertical } from "react-icons/bs"
import { deleteJob } from "../../../Apis/JobRequests"

function Client({ job, setEffect }) {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER

   const userData = useSelector((state) => state.user)
   const userId = userData._id
   const [options, setOptions] = useState(false)

   const [deleteModal,setdeleteModal] = useState(false)
   const handleDelete = async () => {
      try {
         const { data } = await deleteJob(job._id)
         console.log(data)
         toast.warn(data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
         })
         setEffect(Date.now())
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <>
         <div className='flex pt-8 justify-center'>
            <div className=' w-screen flex justify-center'>
               <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4'>
                  <div className='flex justify-between items-center'>
                     {/* NAME AND PROFILE PIC  */}
                     <div className='h-16  flex items-center'>
                        <img
                           className=' rounded-full w-10 mx-3'
                           src={ PF + userData.profilePic }
                           alt='profile-pic'
                        />
                        <div className='pr-4 '>
                           <p className='font-medium text-sm '>{userData?.fullName}</p>
                           <div className='flex gap-4 items-center'>
                              <p className='text-xs'>@{userData?.userName}</p>
                           </div>
                        </div>
                     </div>

                     <div className='pr-3 relative'>
                        <div>
                           <span onClick={() => setOptions(!options)} className='cursor-pointer'>
                              <BsThreeDotsVertical />
                           </span>
                           {options && job.work === "open" ? (
                              <ul
                                 class='cursor-pointer dropdown-menu min-w-max absolute right-0 bg-white text-base z-50 float-left py-2 list-none
                                      text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none'
                              >
                                 <li>
                                    <span
                                       onClick={()=>setdeleteModal(true)}
                                       class='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                                              bg-transparent text-gray-700 hover:bg-gray-100'
                                    >
                                       Delete
                                    </span>
                                 </li>
                                 <li>
                                    <span
                                       class='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                                            bg-transparent text-gray-700 hover:bg-gray-100'
                                       onClick={() => setOptions(false)}
                                    >
                                       cancel
                                    </span>
                                 </li>
                              </ul>
                           ) : null}
                        </div>
                     </div>

                     {/* SIDE DOT END  */}
                  </div>
                  <div className='flex flex-col p-6'>
                     <div className='flex flex-col gap-2 mb-2 mx-3'>
                        <div className='flex gap-2 items-center'>
                           <p className='font-medium'>Job Role :</p>
                           <span className='text-sm'>{job?.jobRole}</span>
                        </div>

                        <div className='flex gap-2 items-center'>
                           <p className='font-medium'>Work Type :</p>
                           <span className='text-sm'>{job?.workType}</span>
                        </div>
                        <div className='flex gap-2 items-center'>
                           <p className='font-medium'>Work Period :</p>
                           <span className='text-sm'>{job?.workPeriod}</span>
                        </div>
                        <div className='flex gap-2 '>
                           <p className='font-medium'>Description:</p>
                           <span className='text-sm mt-1'>{job?.description}</span>
                        </div>
                     </div>
                  </div>

                  <div className='flex flex-col'>
                     {/* LIKE AND COMMENT  */}
                     <div className='flex justify-center'>
                        <div className='flex justify-between w-3/4 m-4'>
                           <div className='flex items-center gap-1'>
                              <p className='text-green-600 text-sm font-medium'>{format(job?.createdAt)}</p>
                           </div>
                           <Link to={`/profile/${job?.work?.userName}`}>
                              {job?.work !== "open" && (
                                 <p className='text-blue-500'>
                                    Work Assigned to <span className='font-medium'>@{job.work.userName}</span>
                                 </p>
                              )}
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <ToastContainer />
         </div>

  </>
   )
}

export default Client
