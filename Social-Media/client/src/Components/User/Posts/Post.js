
import React, {  useState, useEffect, useRef } from "react"
import axios from '../../../Axios/axios' 
import {format} from 'timeago.js'
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';  //Toast
import 'react-toastify/dist/ReactToastify.css';  //Toast Css

import profile from "../../../assets/images/download.png"

/* ------------------------------ ICONS IMPORT ------------------------------ */

import { BsThreeDotsVertical } from "react-icons/bs"
import { FaRegHeart, FaRegComment, FaRegPaperPlane, FaRegStar } from "react-icons/fa"
import { FcLike } from "react-icons/fc"



function Post({post}) {
  
   const effectRan = useRef(false)

   const userData = useSelector(state =>state.user)
   const userId = userData._id;

    const PF = process.env.REACT_APP_PUBLIC_FOLDER ;
    const [user,setUser] = useState({})

    useEffect(() => {

      if(effectRan.current === false){
        const fetchPostUser = async ()=>{
            const res = await axios.get(`/postDetails/users?userId=${post.userId}`)
            console.log(res,'post res 12');

            setUser(res.data)
        }
        fetchPostUser()
        return () => effectRan.current = true
        }
  

    }, [post.userId]);
    
/* ---------------------------- HANDLE POST LIKES --------------------------- */

const [likeState,setLikeState] = useState(false)

const [like,setLike] = useState(post?.likes?.length)

const handleLike=async(e)=>{

   console.log(userId,'oo');
   console.log(post._id,'piddd');

   let res =await axios.put(`/post/like/${post._id}`,{userId:userId})
   
      setLikeState(!likeState)
      setLike(likeState ? like - 1 : like + 1)
   

   console.log(res,'like res');

}

useEffect(() => {

   setLikeState(post.likes.includes(userId))

}, [userId,post._id]);

/* -------------------------- POST COMMENT HANDLING ------------------------- */

// State 

const [commentUpdate, setCommentUpdate ] = useState(false)
const [comment, setComment] = useState('')


// function 

const handleSetComment = (e)=>{
   console.log('call');
   if(/^\s/.test(e.target.value))
   setComment('')
   else
   setComment(e.target.value)
}


const handleComment =async (e) =>{

   e.preventDefault()
   const data ={
      userId:userId,
      comment:comment
   }

   try {

    let res =  await axios.put(`/post/comment/${post._id}`,{...data})
      setComment('')
      effectRan.current = false
      setCommentUpdate(!commentUpdate)
      toast.success(res.data.message,{
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: true,
         theme:"dark"
       })

   } catch (error) {
      console.log('in error');
      console.log(error);
   }

}


/* ---------------------------- VIEW ALL COMMENTS --------------------------- */

const [viewComment, setViewComment] = useState(false)
const [allComments,setAllComments] = useState([])

useEffect(() => {
   if(effectRan.current === false){
      const fetchComments = async ()=>{
         let res = await axios.get(`/post/viewComments/${post._id}`)
         setAllComments(res.data)
         console.log('update on effect cccoommmeennt');
      }
      fetchComments()
      return () => effectRan.current = true
   }
}, [viewComment,commentUpdate]);


const handleViewComment = async(e)=>{
   e.preventDefault()
   setViewComment(!viewComment)
   effectRan.current = false
}





  return (
  <div>
            <div className='flex pt-8 justify-center'>
               {/* FEEDS AREA  */}

               <div className=' w-screen flex justify-center'>
                  <div className='bg-[#FFFFFF] w-[470px] rounded-lg shadow-md border mb-4'>
                     <div className='flex justify-between items-center'>
                        {/* NAME AND PROFILE PIC  */}

                        <div className='h-16  flex items-center'>
                           <img className=' rounded-full w-10 mx-3' src={profile} alt='profile-pic' />
                           <div className='pr-4 '>
                              <p className='font-medium text-sm '>{user.fullName}</p>
                              <div className='flex gap-4 items-center'>
                                 <p className='text-xs'>@{user.userName}</p>
                                 <span className='text-gray-400 text-xs'>{format(post.createdAt)}</span>
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
                                 {post.description}
                                 <br />
                                 <br />
                              </span>
                           </div>
                        </div>
                     </div>
                     {/* POST AREA */}

                     <div className='bg-slate-200  w-full h-[470px] flex justify-center'>
                        <img className='object-fill' src={PF+post.image} alt='post' />
                     </div>
                     {/* POST AREA END*/}

                     <div className='flex flex-col'>
                        {/* LIKE AND COMMENT  */}

                        <div className='flex justify-center'>
                           <div className='flex justify-between w-3/4 m-4'>
                              <div className='flex items-center gap-1'>
                                 <span title='like' className=' text-gray-600 cursor-pointer' onClick={handleLike}>
                                   { likeState ? <FcLike className='text-lg ' />:<FaRegHeart className="text-lg"/>  }
                                 </span>
                                 <span>{like}</span>
                              </div>

                              <div className='flex items-center gap-1'>
                                 <span title='comment' className='text-gray-600' onClick={handleViewComment}>
                                    {React.createElement(FaRegComment, { size: 18 })}
                                 </span>
                                 <span>{allComments.length}</span>
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
                     { viewComment ? allComments.map((comment,i)=>{
                          return(
                          <div className="flex gap-3 my-2 items-center">
                             <div>
                                 <img className="w-8 rounded-full" src={profile} alt="profile" />
                             </div>
                             <div>
                              <div>
                                 <span className="font-medium text-sm mr-2">{comment.userId.userName}</span>
                                 <span className="">{comment.comment}</span>
                              </div>
                              <p className="text-slate-500 text-xs ">{format(comment.createdAt) }</p>
                             </div>
                          </div>
                          )

                     })
                     
                     : <div className=''>
                           <form className='flex justify-between'>
                              <textarea
                                 name='comment'
                                 id='comment'
                                 rows='1'
                                 value={comment}
                                 onChange={handleSetComment}
                                 placeholder='Add your comments'
                                 className='w-3/4'
                              ></textarea>
                              <div>
                                 <button disabled={!comment} className='text-blue-500 disabled:opacity-50' onClick={handleComment}>Post</button>
                              </div>
                           </form>
                        </div>}
                     </div>
                  </div>
               </div>

               {/* FEEDS AREA END  */}
            </div>
            <ToastContainer />                                                                        
  </div>
  )
}

export default Post;
