import React, { useEffect, useState } from "react"
import axios from '../../../../Axios/axios'

import profile2 from "../../../../assets/images/profile11.jpg"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function RightSidebar() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const userData = useSelector(state =>state.user)
  console.log(userData,'oooopp');


  const [suggestions,setSuggestions] = useState([])
  const [state, setState] = useState(false)

  const userId = userData._id

useEffect(() => {

    
    axios.get('/suggestions/'+userId).then((res)=>{
    setSuggestions(res.data)

}).catch((error)=>{
  console.log(error,'error com');
})
}, [state]);


// HANDLE FOLLOW 

const handleFollow= (Id)=>{

  console.log(userId,'opuserid');
  axios.put(`/${userId}/follow`,{Id}).then((res)=>{
    setState(!state)
  }).catch((err)=>{
    console.log(err);
  })

}

// HANDLE UN FOLLOW 

const handleUnFollow = (Id)=>{
  console.log(userId,'pppoid');
  axios.put(`/${userId}/unfollow`,{Id}).then((res)=>{
    setState(!state)
  }).catch((err)=>{
    console.log(err);
  })
}




   return (
      <div className='bg-white m-12 shadow-md rounded-md p-8 fixed right-0 top-0 hidden lg:block'>
         <p className='mb-6'>Suggested</p>


         {suggestions?.map((user,index)=>{
          if(user._id != userId ){
            

              return   (
             
                <div className='flex justify-between items-center mb-5 gap-11' key={index}>
                  <Link to={`/profile/${user.userName}`}>
                   <div className='flex'>
                      <img className='rounded-full w-14 h-14 ' src={user?.profilePic? PF+user.profilePic : profile2} alt='pic' />
                      <div className='flex flex-col justify-center items-center ml-3'>
                         <p className='font-medium text-sm'>{user.userName}</p>
                         <p className='font-normal text-xs'>{user.accountType}</p>
                      </div>
                   </div></Link>
                  { !user.followers.includes(userId)?
                   <button type="button" className="text-white flex justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 w-20"  onClick={(e)=>handleFollow(user._id)}>follow</button>
                   :  <button type="button" className="text-white flex justify-center bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700 hover:bg-gradient-to-br focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2 w-20"  onClick={(e)=>handleUnFollow(user._id)}>unfollow</button>
                  }
                  </div>
                )
            
        
          }
      }) }





      </div>
   )
}

export default RightSidebar
