import React, {  useState, useEffect } from "react"
import axios from '../../../Axios/axios'

import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css

import profile from "../../../assets/images/download.png"

/* ------------------------------ ICONS IMPORT ------------------------------ */
import {AiOutlineCloseCircle} from 'react-icons/ai'
import { BiImage } from "react-icons/bi"
import {useSelector } from "react-redux"
import Post from "../Posts/Post";

function Home() {

   const userData = useSelector(state =>state.user)

   /* ------------------------------ADD POST HANDLING ----------------------------- */

   // POST States

   const [description, setDescription] = useState("")
   const [postImage, setPostImage] = useState()
   const [showImage, setShowImage] = useState()

   const handleImage =(e)=>{
   console.log('yyyyyy');
   setShowImage(URL.createObjectURL(e.target.files[0]))
   setPostImage(e.target.files[0])
}

  
//********** */ POST UPLOAD SUBMIT //******* */

  const handleSubmit =async (e)=>{
   console.log('reachedddd');
   e.preventDefault()
   
      const postDetails ={
         userId:userData._id,
         description:description
      }

      if(postImage){
         const data = new FormData()
         const fileName = postImage.name
         data.append('file',postImage)
         // data.append('name',fileName)
         data.append('userId',userData._id)
         data.append('description',description)
         // postDetails.image = fileName

      try {
      axios.post('/uploadPost',data).then((res)=>{
         console.log(res,'its res post');
         window.location.reload()
      }).catch((err)=>{
         console.log(err,'its err');
      })   
   } catch (error) {
      alert(error)
   }
  }
// Description 
//   try {

//     axios.post('/add_new_post',postDetails).then((res)=>{
//       console.log(res,'post res');
//       toast.warn("Post added successfully!",{
//          position: "top-center",
//          autoClose: 2000,
//          hideProgressBar: true,
//          theme:"dark"
//        });
//     }).catch((err)=>{
//       console.log(err,'p error');
//     })

//   } catch (error) {
//    console.log(error.message);
//   }
}
/* ---------------------------ADD POST HANDLING ENDS --------------------------- */



/* ----------------------------- FEED DISPLAYING FUNCTION---------------------------- */

const [feedPosts, setFeedPosts] = useState([])
console.log(feedPosts,'poooooooosssttststs');
useEffect(() => {
   const userId = userData._id
   console.log(userId,'uid');
   const fetchPost = async()=>{
      const res = await axios.get(`/post/timeline_post/${userId}`)
      console.log(res.data[0],'timeline post res');
      setFeedPosts(res.data)
      // setFeedPosts(
      //    res.data.sort((pst1,pst2)=>{
      //       return new Date(pst1.createdAt) - new Date(pst2.createdAt)
      //    })
      // )
   }
   fetchPost()
}, []);

/* ----------------------------- FEED DISPLAYING FUNCTION END ---------------------------- */


// ****** FUNCTION ENDS *******//

   return (
      <>
         <div className=' w-full h-full '>
            
            {/* FEEDS ADD  */}

         <div className=' pt-16 flex justify-center mx-4'>
            <div className="w-screen">
            <div className=' flex justify-center'>
               <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4 '>
                  <form onSubmit={handleSubmit}>
                  <div className='flex justify-between items-center'>
                     <div className='h-16  flex items-center'>
                        <img className=' rounded-full w-10 mx-3' src={profile} alt='profile-pic' />
                        <div className='pr-4 '>
                           <p className='font-medium text-sm '>{userData.fullName }</p>
                           <div className='flex gap-4 items-center'>
                              <p className='text-xs'>{userData.userName}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='w-full px-8 pt-2'>
                     <textarea
                        className=' outline-none'
                        name='post_description'
                        id='description'
                        cols='50'
                        rows='3'
                        placeholder='Whats new! '
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                     ></textarea>
                  { showImage ?  <span>
                    <span className="absolute"> <AiOutlineCloseCircle/></span>
                     <img src={showImage} alt="" className="relative"/>
                     </span> : null}

                  </div>
                  <hr />
                  <div className='flex justify-between p-4'>   
                     <label htmlFor="img-upload" className="cursor-pointer">
                     <BiImage className='text-2xl'/>
                     </label>
                     <input type="file" name="file" id="img-upload"  onChange={handleImage } className="hidden"/>
                     <button
                        disabled={!description}
                        type='submit'                      
                        class='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 dark:shadow-blue-800/80 font-medium rounded-xl text-sm px-5 py-1 text-center mr-2 mb-2 disabled:opacity-50'
                     >
                        Post
                     </button>
                  </div>
                  </form>
               </div>
               </div>
               </div>
         </div>

         {
           feedPosts? feedPosts.map((post,i)=>(
               <Post key={post.userId} post={post}/>
            )) : <div className="flex justify-center mt-20 ">
               <p className="text-blue-400 font-medium text-xl h-max">Follow SomeOne to See Posts!</p>
            </div>
         }

            {/* DUMMY POSTS  */}

           
         </div>
         <ToastContainer />
      </>
   )
}

export default Home
