import React,{useState,useEffect} from "react";
import "./Profile.css";
import cover from "../../../assets/images/bgImg.avif"
import profile from '../../../assets/images/antony.png'
import {BsGrid1X2} from 'react-icons/bs'
import axios from "../../../Axios/axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router'

function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER ;

  const userData = useSelector(state =>state.user)
  let userId = userData?._id

  const [myPosts,setMyPosts] = useState([])
  const userName = useParams().userName

 
    useEffect(() => {
      console.log('axios call getposts');
      try {
        let user = 
        axios.get(`/profile/myposts/${userId}`).then((res)=>{
          console.log(res,'ooop posts res');
          setMyPosts(res.data)
        })
        
      } catch (error) {
        console.log(error);
      }
    
    }, []);



  return (

  <>
     <div className='w-full mt-10 sm:mt-16 sm:mx-4 md:mt-0 md:w-5/6  lg:w-3/4 lg:flex lg:justify-end bg-white'>

     <div className="ProfileCard lg:container mt-5 ">
      <div className="ProfileImages">
        <img className="w-full h-40 object-cover object-center" src={cover} alt="CoverImage" />
        <img src={profile} alt="ProfileImage"/>
      </div>
      <div className="flex justify-end pr-4">
      <button type="button" class="hidden sm:block text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-700  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">Edit Profile</button>
      </div>
      <div className="ProfileName mt-9 sm:mt-0">
        <span>{userData?.fullName}</span>
        <span> {userData?.accountType}</span>
      </div>
      {/* <div className="flex justify-end pr-4">
      <FiSettings />
      </div> */}
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span className="text-xl font-semibold">120</span>
            <span className="font-medium">followers</span>
          </div>
          <div className="follow">
            <span className="text-xl font-semibold">{myPosts.length}</span>
            <span className="font-medium">posts</span>
          </div>
          {/* for profilepage */}
            
              <div className="follow">
                <span className="text-xl font-semibold">78</span>
                <span className="font-medium">following</span>
              </div>
          
        </div>
        <hr />
      </div>

        <hr className="mt-2"/>
        <span className="inline-flex items-center gap-2">
          <BsGrid1X2/> <span>My Feeds</span> 
        </span>
        {/* profile feeds */}
        <div className="grid grid-cols-1 mx-auto sm:grid-cols-3 px-6 pb-4 gap-4 ">
          {myPosts?.map((posts,i)=>{
            return(
              <div className="">
              <img className="object-cover w-[290px] h-[290px]" src={PF+posts.image}  />
              </div>

            )
          })
         }


        </div>
    </div>

</div>

  </>
  )
}

export default Profile;
