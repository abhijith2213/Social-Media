import React from "react";
import Bottombar from "../../../Components/User/NavigationBars/Bottombar.js/Bottombar";
import Sidebar from "../../../Components/User/NavigationBars/UserSidebar/Sidebar";
import ChangePassword from "../../../Components/User/EditProfile/ChangePassword";

function ChangePasswordPage() {
  return (
    <div>
    <div className=' bg-[#F3F2EF] flex w-full min-h-screen md:pr-4'>                   
        <Sidebar/>          
    <div className=' w-full flex justify-end '>
        <ChangePassword/>
    </div>
        <Bottombar/>
    </div>
</div>
  )
}

export default ChangePasswordPage;
