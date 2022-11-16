import React, { useEffect, useState } from "react"
import axios from '../../../../Axios/axios'

import { GrAdd } from "react-icons/gr"

import profile2 from "../../../../assets/images/profile11.jpg"
import { useSelector } from "react-redux"

function RightSidebar() {

  const userData = useSelector(state =>state.user)
  console.log(userData,'oooopp');


  const [suggestions,setSuggestions] = useState([])
  const [state, setState] = useState(false)

  const userId = userData._id

useEffect(() => {

    
    axios.get('/suggestions/'+userId).then((res)=>{
    console.log(res,'its sidebar res right');
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




   return (
      <div className='bg-white m-12 rounded-md p-8 fixed right-0 top-0 hidden lg:block'>
         <p className='mb-6'>Suggested</p>


         {suggestions?.map((user,index)=>{
          if(user._id != userId ){
            if(!user.followers.includes(userId)){

              return   (
             
                <div className='flex justify-between mb-5 gap-11' key={index}>
                   <div className='flex'>
                      <img className='rounded-full w-14 ' src={profile2} alt='pic' />
                      <div className='flex flex-col justify-center items-center ml-3'>
                         <p className='font-medium text-sm'>{user.userName}</p>
                         <p className='font-normal text-xs'>{user.accountType}</p>
                      </div>
                   </div>
                   <span title='follow' className='m-4 ' onClick={(e)=>handleFollow(user._id)}>
                      {React.createElement(GrAdd, { size: 20 })}
                   </span>
                </div>
                )

            }
            
        
          }
      }) }





      </div>
   )
}

export default RightSidebar
