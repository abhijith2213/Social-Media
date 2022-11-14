import React, {  useState } from "react"
import axios from '../../../Axios/axios'

import profile from "../../../assets/images/download.png"
import post1 from "../../../assets/images/hiring poster.png"

/* ------------------------------ ICONS IMPORT ------------------------------ */

import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegHeart, FaRegComment, FaRegPaperPlane, FaRegStar } from "react-icons/fa"
import { FcLike } from "react-icons/fc"
import { BiImage } from "react-icons/bi"
import {useSelector } from "react-redux"

function Home() {

   const userData = useSelector(state =>state.user)
   console.log(userData,'oooopp');

   // STATES

   const [like, setLike] = useState(false)
   const [likeCount, setLikeCount] = useState(120)

   const handleLike = (e) => {
      setLike(!like)
      if (!like) {
         setLikeCount(likeCount + 1)
      } else {
         setLikeCount(likeCount - 1)
      }
   }

   // POST States

   const [description, setDescription] = useState("")
   const [postImage, setPostImage] = useState()


   const handleChange =(e)=>{
      const {value} = e.target;
      setDescription(value)
   }

   

  const handleNewPost =(e)=>{
   e.preventDefault()
   try {

      const postData =  new FormData
      const postDetails ={
         userId:userData._id,
         description:description
      }
      axios.post('/add_new_post',{...postDetails}).then((res)=>{
         console.log(res,'its res post');
      }).catch((err)=>{
         console.log(err,'its err');
      })
      
   } catch (error) {
      alert(error)
   }
  }


   return (
      <>
         <div className=' w-full h-full '>
            
            {/* FEEDS ADD  */}

         <div className=' pt-16 flex justify-center mx-4'>
            <div className="w-screen">
            <div className=' flex justify-center'>
               <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4 '>
                  <form >
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
                        placeholder='Post new Jobs! '
                        value={description}
                        onChange={handleChange}
                     ></textarea>
                  </div>
                  <hr />
                  <div className='flex justify-between p-4'>
                     <label htmlFor="img-upload" className="cursor-pointer">
                     <BiImage className='text-2xl'/>
                     </label>
                     <input type="file" id="img-upload" onChange={e=>{
                        const file = e.target.files[0];
                        setPostImage(file)
                     }} className="hidden"/>
                     <button
                        disabled={!description}
                        type='button'
                        onClick={handleNewPost}
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

            <div className='flex pt-8 justify-center'>
               {/* FEEDS AREA  */}

               <div className=' w-screen flex justify-center'>
                  <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4'>
                     <div className='flex justify-between items-center'>
                        {/* NAME AND PROFILE PIC  */}

                        <div className='h-16  flex items-center'>
                           <img className=' rounded-full w-10 mx-3' src={profile} alt='profile-pic' />
                           <div className='pr-4 '>
                              <p className='font-medium text-sm '>Vahursinga</p>
                              <div className='flex gap-4 items-center'>
                                 <p className='text-xs'>@vahursinga</p>
                                 <span className='text-gray-400 text-xs'>1 day ago</span>
                              </div>
                           </div>
                        </div>

                        {/* NAME AND PROFILE PIC  END*/}

                        {/* SIDE DOT START  */}

                        <div className='pr-3'>
                           <div>{React.createElement(BsThreeDotsVertical, { size: 20 })}</div>
                        </div>

                        {/* SIDE DOT END  */}
                     </div>
                     <div className='flex flex-col'>
                        <div className='flex mb-2 mx-3'>
                           <div>
                              <span className='text-sm'>
                                 We are Hiring "Graphic Designer for our next Project" Contact us
                                 <br />
                                 <br />
                              </span>
                              {/* <span className="text-gray-400">...&nbsp; more</span> */}
                           </div>
                        </div>
                     </div>
                     {/* POST AREA */}

                     <div className='bg-slate-200  w-full h-[470px] flex justify-center'>
                        <img className='object-fill' src={post1} alt='post' />
                     </div>
                     {/* POST AREA END*/}

                     <div className='flex flex-col'>
                        {/* LIKE AND COMMENT  */}

                        <div className='flex justify-center'>
                           <div className='flex justify-between w-3/4 m-4'>
                              <div className='flex items-center gap-1'>
                                 <span title='like' className=' text-gray-600' onClick={handleLike}>
                                    {/* {React.createElement(FaRegHeart, { size: 18 })} */}
                                    {like ? <FcLike className='text-lg ' /> : <FaRegHeart className='text-lg ' />}
                                 </span>
                                 <span>{likeCount}</span>
                              </div>

                              <div className='flex items-center gap-1'>
                                 <span title='comment' className='text-gray-600'>
                                    {React.createElement(FaRegComment, { size: 18 })}
                                 </span>
                                 <span>10</span>
                              </div>

                              <span title='Share' className='text-gray-600'>
                                 {React.createElement(FaRegPaperPlane, { size: 18 })}
                              </span>
                              <span title='Connect' className='text-gray-600'>
                                 {React.createElement(FaRegStar, { size: 18 })}
                              </span>
                           </div>
                        </div>

                        {/* LIKE AND COMMENT END */}

                        {/* DESCRIPTION AREA  */}
                     </div>

                     <hr />
                     <div className=' px-6 py-2'>
                        <div className=''>
                           <form className='flex justify-between'>
                              <textarea
                                 name='comment'
                                 id='comment'
                                 rows='1'
                                 placeholder='Add your comments'
                                 className='w-3/4'
                              ></textarea>
                              <div>
                                 <button className='text-blue-300'>Post</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>

               {/* FEEDS AREA END  */}
            </div>

            {/* DUMMY POSTS  */}

            <div className='flex  pt-14 justify-center '>
               {/* FEEDS AREA  */}

               <div className=' w-screen flex justify-center'>
                  <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4'>
                     <div className='flex justify-between items-center'>
                        {/* NAME AND PROFILE PIC  */}

                        <div className='h-16  flex items-center'>
                           <img className=' rounded-full w-10 mx-3' src={profile} alt='profile-pic' />
                           <div className='pr-4 '>
                              <p className='font-medium text-sm '>Vahursinga</p>
                              <div className='flex gap-4 items-center'>
                                 <p className='text-xs'>@vahursinga</p>
                                 <span className='text-gray-400 text-xs'>1 day ago</span>
                              </div>
                           </div>
                        </div>

                        {/* NAME AND PROFILE PIC  END*/}

                        {/* SIDE DOT START  */}

                        <div className='pr-3'>
                           <div>{React.createElement(BsThreeDotsVertical, { size: 20 })}</div>
                        </div>

                        {/* SIDE DOT END  */}
                     </div>
                     <div className='flex flex-col'>
                        <div className='flex mb-2 mx-3'>
                           <div>
                              <span className='text-sm'>
                                 We are Hiring "Graphic Designer for our next Project" Contact us
                                 <br />
                                 <br />
                              </span>
                              {/* <span className="text-gray-400">...&nbsp; more</span> */}
                           </div>
                        </div>
                     </div>
                     {/* POST AREA */}

                     <div className='bg-slate-200  w-full h-[470px] flex justify-center'>
                        <img className='object-fill' src={post1} alt='post' />
                     </div>
                     {/* POST AREA END*/}

                     <div className='flex flex-col'>
                        {/* LIKE AND COMMENT  */}

                        <div className='flex justify-center'>
                           <div className='flex justify-between w-3/4 m-4'>
                              <div className='flex items-center gap-1'>
                                 <span title='like' className=' text-gray-600'>
                                    {React.createElement(FaRegHeart, { size: 18 })}
                                 </span>
                                 <span>139</span>
                              </div>

                              <div className='flex items-center gap-1'>
                                 <span title='comment' className='text-gray-600'>
                                    {React.createElement(FaRegComment, { size: 18 })}
                                 </span>
                                 <span>10</span>
                              </div>

                              <span title='Share' className='text-gray-600'>
                                 {React.createElement(FaRegPaperPlane, { size: 18 })}
                              </span>
                              <span title='Connect' className='text-gray-600'>
                                 {React.createElement(FaRegStar, { size: 18 })}
                              </span>
                           </div>
                        </div>

                        {/* LIKE AND COMMENT END */}

                        {/* DESCRIPTION AREA  */}
                     </div>

                     <hr />
                     <div className=' px-6 py-2'>
                        <div className=''>
                           <form className='flex justify-between'>
                              <textarea
                                 name='comment'
                                 id='comment'
                                 rows='1'
                                 placeholder='Add your comments'
                                 className='w-3/4'
                              ></textarea>
                              <div>
                                 <button className='text-blue-300'>Post</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>

               {/* FEEDS AREA END  */}
            </div>
         </div>
      </>
   )
}

export default Home
