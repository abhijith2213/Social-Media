import React from "react";
import { MdNotificationsNone } from "react-icons/md";
import { FiMessageSquare} from "react-icons/fi";
import { BiHome, BiMessageSquareAdd} from "react-icons/bi";
import { CgProfile} from "react-icons/cg";

import logo from '../../../../assets/images/logo6.png'


import { Link } from "react-router-dom";

function Bottombar() {

    const menus = [
        { name: "Home", link: "/home", icon: BiHome },
        { name: "Create", link: "/home", icon: BiMessageSquareAdd },
        { name: "Messages", link: "/home", icon: FiMessageSquare ,bottom:true},
      ];

  return (
  <>

<div  className="border shadow-md  bg-white fixed bottom-0 w-full md:hidden">
        
        <div className=" flex  justify-around  relative  ">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.bottom && ""
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}>
              <div className="text-2xl sm:text-4xl">{React.createElement(menu?.icon, )}</div>
              <h2 
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 font-normal pr-8 hidden lg:block`}
              >
                {menu?.name}
              </h2>
             
            </Link>
          ))}
        </div>
      </div>
{/* TOP BAR  */}
      <div  className="border shadow-md  bg-white fixed top-0 w-full md:hidden">

      <div className="flex justify-between items-center relative p-3 ">
        <div className="flex items-center justify-between">
          <img className="w-8 h-auto sm:w-10" src={logo} alt="" />
          <h2 className="pl-2 sm:text-3xl">Logo</h2>
        </div>
        {/* <div>
            Search
        </div> */}
        <div className="flex gap-5 text-2xl sm:text-3xl">
        {React.createElement(MdNotificationsNone, )}
        {React.createElement(CgProfile, )}
        </div>
        </div>
      </div>

  </>
  )
}

export default Bottombar;
