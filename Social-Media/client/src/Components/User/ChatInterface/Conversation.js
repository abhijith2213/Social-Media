import React,{useState, useEffect} from "react";
import { getUser } from "../../../Apis/userRequests";

import profile from "../../../assets/images/download.png"

function Conversation({data, currentUserId, online}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  console.log(data,'data yyyyyyy');
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find((id)=>id!== currentUserId)
        const getUserData = async()=>{
            try {
                const {data} = await getUser(userId)
                setUserData(data)
                console.log(data,'conversa');
            } catch (error) {
                console.log(error);
            }

        }
      getUserData()
    },[]);
    

  return( <div>

              <a
                class="flex items-center px-3 py-2 text-sm transition duration-150  ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">     
                {/* <span className="absolute w-3 h-3 bg-green-600 rounded-full "></span> */}
                <img class="object-cover w-10 h-10 rounded-full"
                  src={userData?.profilePic? PF+userData.profilePic : profile} alt="username" />
                <div class="w-full pb-2">
                  <div class="flex justify-between">
                    <span class="block ml-2 font-semibold text-gray-600">{userData?.userName}</span>
                    {/* <span class="block ml-2 text-sm text-gray-600">25 minutes</span> */}
                  </div>
                 {online &&  <span class="block ml-2 text-sm text-green-400">online</span>}
                </div>
              </a>

  </div>
)}

export default Conversation;
