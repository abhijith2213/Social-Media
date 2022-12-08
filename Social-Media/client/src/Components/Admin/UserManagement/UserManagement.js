import axios from "../../../Axios/axios"
import adminInstance from "../../../Axios/adminAuth"

import React, { useState, useEffect } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css

import { confirmAlert } from 'react-confirm-alert';  // Import
import 'react-confirm-alert/src/react-confirm-alert.css';  // Import css

function UserManagement() {

    const navigate = useNavigate()

   const [users, setUsers] = useState([])
   const [status, setStatus] = useState(true)

   useEffect(() => {
      console.log('uuu');
            adminInstance.get("/user_management").then((response) => {
            setUsers(response.data)
         })
         .catch((error) => {
            if(!error.response.data.auth){
               toast.warn(error.response.data.message)
               navigate('/admin_login')
            }
         })
   }, [status])


  


   /* -------------------------------- BLOCK USER ------------------------------- */
   const blockUser = (userId) => {
    console.log(userId);
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => 
          adminInstance.put("/user_management/block_user",{userId}).then((res)=>{
            if(res.data.update){
             toast.warn("User blocked successfully!",{
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme:"dark"
              });
            }
            setStatus(!status)
          })
        },
        {
          label: 'No',
          onClick: () => toast.warn("User block Cancelled!",{
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme:"dark"
        })
      }
      ]
    });
     
   }

   /* ------------------------------ UNBLOCK USER ------------------------------ */

   const unblockUser = (userId)=>{

         confirmAlert({
           title: 'Confirm to submit',
           message: 'Are you sure to do this.',
           buttons: [
             {
               label: 'Yes',
               onClick: () => 
               adminInstance.put('/user_management/unblock_user',{userId}).then((res)=>{
                  console.log(res);
                  if(res.data.update){
                    toast.warn("User unblocked successfully!",{
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: true,
                      theme:"dark"
                    });
                     setStatus(!status)
                  }
             })
            },
             
             {
               label: 'No',
               onClick: () => toast.warn("User unblocked Cancelled!",{
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  theme:"dark"
                })
             }
            
         ]
           
         });
       };
   


   return (
      <>
         <div className='w-full mr-6 '>
            <h2 className='text-2xl font-bold my-6'>User Management</h2>

            <div class='overflow-x-auto relative'>
               <table class='w-full text-sm  text-gray-500 dark:text-gray-400 text-center'>
                  <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                     <tr>
                        <th scope='col' class='py-3 px-6'>
                           User Id
                        </th>
                        <th scope='col' class='py-3 px-6'>
                           Email
                        </th>
                        <th scope='col' class='py-3 px-6'>
                           Account Type
                        </th>
                        <th scope='col' class='py-3 px-6'>
                           Created Date
                        </th>
                        <th scope='col' class='py-3 px-6'>
                           Action
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {users?.map((user, i) => {
                        user.created_date = moment(user.created_date).format("YYYY-MM-DD")
                        return (
                           <tr key={i} class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                              <th
                                 scope='row'
                                 class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                              >
                                 {user._id}
                              </th>
                              <td class='py-4 px-6'>{user.email}</td>
                              <td class='py-4 px-6'>{user.accountType}</td>
                              <td class='py-4 px-6'>{user.created_date}</td>
                              <td class='py-4 px-6'>
                                 {user.status === "active" ? (
                                    <button
                                       type='button'
                                       class='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900'
                                       onClick={(e)=>{blockUser(user._id)}}
                                    >
                                       Block
                                    </button>
                                 ) : (
                                    <button
                                       type='button'
                                       class='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                                       onClick={(e)=>{unblockUser(user._id)}}
                                    >
                                       Unblock
                                    </button>
                                 )}
                              </td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>
            </div>
         </div>
         <ToastContainer />
      </>
   )
}

export default UserManagement
