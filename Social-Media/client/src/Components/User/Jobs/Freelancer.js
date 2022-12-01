import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { format } from "timeago.js"
import { ToastContainer, toast } from "react-toastify" //Toast
import "react-toastify/dist/ReactToastify.css" //Toast Css


// Assets
import profile from "../../../assets/images/download.png"
import { BsThreeDotsVertical, BsFlagFill } from "react-icons/bs"
import { FaRegPaperPlane } from "react-icons/fa"
import { sendConnect } from "../../../Apis/JobRequests"


function Freelancer({job,setShowReport,setEffect}) {
    const userData = useSelector((state) => state.user)
    const userId = userData._id
    const [options, setOptions] = useState(false)

    const handleConnect =async()=>{
        try {
            const {data} = await sendConnect(userId,job._id)
            console.log(data);
            setEffect(Date.now())
            toast.warn(data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "dark",
             }) 
        } catch (error) {
            console.log(error);
        }
    }



  return (
    <>
       <div className='flex pt-8 justify-center'>
          <div className=' w-screen flex justify-center'>
             <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4'>
                <div className='flex justify-between items-center'>
                <Link to={`/profile/${job?.userId?.userName}`}>
                   <div className='h-16  flex items-center'>
                      <img className=' rounded-full w-10 mx-3' src={profile} alt='profile-pic' />
                      <div className='pr-4 '>
                         <p className='font-medium text-sm '>{job?.userId?.fullName}</p>
                         <div className='flex gap-4 items-center'>
                            <p className='text-xs'>@{job?.userId?.userName}</p>
                         </div>
                      </div>
                   </div></Link>

                   <div className='pr-3 relative'>
                      <div>
                         <span onClick={() => setOptions(!options)} className='cursor-pointer'>
                            <BsThreeDotsVertical />
                         </span>
                         {options && (
                            <ul
                               class='cursor-pointer dropdown-menu min-w-max absolute right-0 bg-white text-base z-50 float-left py-2 list-none
                                text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none'>
                               <li>
                                  <span onClick={()=>setShowReport(true)}
                                     class='dropdown-item text-sm inline-flex items-center text-red-600 py-2 px-4 font-normal  w-full whitespace-nowrap
                                      bg-transparent  hover:bg-gray-100'>
                                     <BsFlagFill className='mr-2' /> Report
                                  </span>
                               </li>
                               <li>
                                  <span
                                     class='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap
                                     bg-transparent text-gray-700 hover:bg-gray-100'
                                     onClick={() => setOptions(false)}>
                                     cancel
                                  </span>
                               </li>
                            </ul>
                         )}
                      </div>
                   </div>

                   {/* SIDE DOT END  */}
                </div>
                <div className='flex flex-col p-6'>
                   <div className='flex flex-col gap-2 mb-2 mx-3'>
                      <div className='flex gap-2 items-center'>
                         <p className=''>Job Role :</p>
                         <span className='font-medium'>{job?.jobRole}</span>
                      </div>

                      <div className='flex gap-2 items-center'>
                         <p className=''>Work Type :</p>
                         <span className='font-medium'>{job?.workType}</span>
                      </div>
                      <div className='flex gap-2 items-center'>
                         <p className=''>Work Period :</p>
                         <span className='font-medium'>{job?.workPeriod}</span>
                      </div>
                      <div className='flex gap-2 '>
                         <p className=''>Description:</p>
                         <span className='text-lg'>{job?.description}</span>
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
                         {job?.requests.includes(userId) ?
                         <button class='disabled:bg-blue-300 cursor-not-allowed flex items-center gap-2 text-white font-bold py-2 px-4 rounded'
                         disabled>
                          <FaRegPaperPlane /> Connected
                       </button>
                         :<button class='bg-blue-500 hover:bg-blue-700 flex items-center gap-2 text-white font-bold py-2 px-4 rounded'
                           onClick={handleConnect}>
                            <FaRegPaperPlane /> Connect
                         </button>}
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       <ToastContainer/>
 </>
  )
}

export default Freelancer;
