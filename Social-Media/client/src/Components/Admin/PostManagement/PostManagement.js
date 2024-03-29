import React, { useEffect, useState } from "react";
import moment from "moment"

import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css
import { blockUserPost, fetchReportedPosts, getReportDetails, unblockUserPost } from "../../../Apis/PostRequest";

function PostManagement() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [update,setUpdate] = useState(false)
    const [posts,setPosts] = useState([])
    const [showModal, setShowModal] = useState(false);

    const [modalData,setModalData]=useState({})
    const [reportData,setreportData] = useState([])

    useEffect(()=>{

        const fetchPost =async ()=>{
            try {
                const {data} = await fetchReportedPosts()
                setPosts(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchPost()
    },[update])

    // HANDLE MODAL VIEW 

    console.log(reportData);
    const handleView=async(post)=>{
        setModalData(post)
        setShowModal(true)
        try {  
          const {data} = await getReportDetails(post._id) 
          setreportData(data)
          console.log(data,'reporteddataaaa');
        } catch (error) {
          console.log(error);
        }
    }

    // HANDLE BLOCK POST 

    const handleBlockPost =async(postId)=>{
        console.log(postId,'pppiddd');
        try {
            const {data} = await blockUserPost(postId)
            console.log(data,'block res');
            setUpdate(!update)
            setShowModal(false)
            toast.warn(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    // UNBLOCK POST 

    const handleUnblockPost = async (postId)=>{
        try {
            const {data} = await unblockUserPost(postId)
            console.log(data,'block res');
            setUpdate(!update)
            setShowModal(false)
            toast.warn(data.message)
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <>
    <div className='w-full mr-6 max-h-screen overflow-y-auto no-scrollbar'>
       <h2 className='text-2xl font-bold my-6'>Post Management</h2>

       <div class='overflow-x-auto relative'>
          <table class='w-full text-sm  text-gray-500 dark:text-gray-400 text-center'>
             <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                   <th scope='col' class='py-3 px-6'>
                      Post Id
                   </th>
                   <th scope='col' class='py-3 px-6'>
                      Posted By
                   </th>
                   <th scope='col' class='py-3 px-6'>
                      Created Date
                   </th>
                   <th scope='col' class='py-3 px-6'>
                      Status
                   </th>
                   <th scope='col' class='py-3 px-6'>
                      No.of Reports
                   </th>
                   <th scope='col' class='py-3 px-6'>
                      Action
                   </th>
                </tr>
             </thead>
             <tbody>
                    {posts.map((post)=>{
                       let date = moment(post?.createdAt).format("YYYY-MM-DD")
                return(

                      <tr  class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                         <th
                            scope='row'
                            class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                         >
                           {post?._id}
                         </th>
                         <td class='py-4 px-6'>{post?.userId?.userName}</td>
                         <td class='py-4 px-6'>{date}</td>
                         <td class='py-4 px-6'>{post?.status}</td>
                         <td class='py-4 px-6'>{post?.reports?.length}</td>
                         <td class='py-4 px-6'>

                               <button
                                  type='button'
                                  onClick={() =>handleView(post)}
                                  class='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'>
                                  View
                               </button>
                         </td>
                      </tr>
                    )})}
             </tbody>
          </table>
       </div>
    </div>
    <ToastContainer 
    position="top-center"
    autoClose={3000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover
    theme="dark"/>

    <>

      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-lg">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Details
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 flex-auto">
                    {modalData.image ?
                    <div className="flex justify-center">
                      <img className="max-w-[150px]" src={ PF+ modalData.image}/>
                    </div> 
                    :null}
                  <p className="my-2 text-slate-500 text-md leading-relaxed">
                   Description: {modalData.description}
                  </p>
                  <p>
                    No.of Reports : {modalData?.reports?.length}
                  </p>

                  <div className="overflow-y-auto max-h-32">
                  <table class=' text-xs border rounded-lg my-2 w-80  text-gray-500  text-center'>
                    <thead class='text-xs text-gray-700 uppercase bg-gray-100'>
                      <tr>
                        <th>Report By</th>
                        <th>Reported At</th>
                        <th>Reason</th>
                      </tr>
                    </thead>
                    <tbody className="">
                    {reportData?.map((data)=>{
                      let reportedOn = moment(data?.createdAt).format("YYYY-MM-DD")
                      return(                     
                      <tr className="text-sm">
                        <td>{data?.userId.userName}</td>
                        <td>{reportedOn}</td>
                        <td>{data?.reason}</td>
                      </tr>
                      
                    )})}
                    </tbody>
                  </table>   
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                {modalData.status === 'active' ?  <button
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleBlockPost(modalData._id)}
                  >
                    Block Post
                  </button> : <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleUnblockPost(modalData._id)}
                  >
                    Unblock Post
                  </button>}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
 </>
  )
}

export default PostManagement;
