
/* --------------------------------- ASSETS --------------------------------- */

import {  HiOutlineLogout } from "react-icons/hi";
import { MdNotificationsNone , MdWorkOutline} from "react-icons/md";
import { FiMessageSquare} from "react-icons/fi";
import { BiHome} from "react-icons/bi";
import { CgProfile} from "react-icons/cg";

import log from '../../../../assets/images/talentF-c.png'


/* --------------------------------- ASSETS END--------------------------------- */

import React,{useEffect,useState} from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import { useDispatch ,useSelector} from "react-redux";
import { remove } from "../../../../Redux/User/userSlice";
import { fetchNoCounts, handleNotCount } from "../../../../Apis/userRequests";
import { socket } from "../../../../Context/socketContext";


function Sidebar() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const socket = useContext(SocketContext)
  const userData = useSelector((state) => state.user)

  const [notifications, setNotifications] = useState('')

  
  useEffect(() => {
    if(userData){
      socket.emit("new-user-add", userData._id)
    }
    fetchnotificationCount()
  }, []);
  
  useEffect(()=>{
    socket.on("getNotification",data =>{
      fetchnotificationCount()
    })
    
  },[socket,notifications])
  
  const fetchnotificationCount=async()=>{
    try {
      const {data} = await fetchNoCounts(userData._id)
      console.log(data,'kkmmbbffrr444');
      setNotifications(data)
    } catch (error) {
      console.log(error);
    }
  }
  

  /* ------------------------------ HANDLE LOGOUT ----------------------------- */

  const handleLogout = () => {
    console.log('in logout');
    confirmAlert({
      title: 'Logout!',
      message: 'Are you sure to Logout .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('userToken')
            localStorage.removeItem('user')
            dispatch(remove())
            navigate('/signin');
    }
  },
  {
    label: 'No',
   
  }
]
    });
 
  }

  /* ------------------------ HANDLE NOTIFICATION COUNT ----------------------- */

  const handleNotiView =async()=>{
      console.log('hi action');
      try {
        const {data} = await handleNotCount(userData._id)
        console.log(data,'pppoooyyttrre');
      } catch (error) {
        console.log(error);
      }
  }

  /* --------------------------------- OPTIONS -------------------------------- */

    const menus = [
        { name: "Home", link: "/home", icon: BiHome },
        { name: "messages", link: "/message", icon: FiMessageSquare },
        { name: "Notifications", link: "/notifications", icon: MdNotificationsNone ,notifications:true ,action:handleNotiView},
        { name: "Works", link: "/works", icon: MdWorkOutline },
        { name: "My Profile", link: "/myprofile", icon: CgProfile },   
        { name: "Logout", link:'/#',  icon: HiOutlineLogout , action:handleLogout},
      ];


  return (
    <>
    <div hidden className="border shadow-md min-h-screen lg:pl-7 lg:pr-12 bg-white fixed md:block  md:w-20  lg:w-64 overflow-hidden ">
        
        <div hidden className="text-center mt-8 mb-9 lg:block flex justify-center ">
        
          <img  className=" lg:w-3/4  mt-2" src={log} alt=""/>
            
        </div>
        <div className=" flex flex-col gap-6 justify-start relative md:items-center lg:items-start">
          {menus?.map((menu, i) => (
            <NavLink end
              to={menu?.link}
              key={i}
              onClick={menu.action}
              className={` ${menu?.notifications && ""
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}>
            <div className="text-2xl">{React.createElement(menu?.icon, )}</div> 
              <h2 
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 font-normal pr-8 hidden lg:block`}
              >
                {menu?.name}
              </h2>
             {menu.notifications && notifications !== 0 ?  <p className="px-2 text-white bg-red-600 rounded-lg">{notifications}</p> :null}
            </NavLink>
          ))}
        </div>
      </div>
      
     

</>
    
  );
}

export default Sidebar;
