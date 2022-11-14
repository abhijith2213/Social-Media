import React from 'react'
import Home from '../../../Components/User/Home/Home'
import Sidebar from '../../../Components/User/NavigationBars/UserSidebar/Sidebar'
import RightSidebar from '../../../Components/User/NavigationBars/RightSidebar/RightSidebar'
import Bottombar from '../../../Components/User/NavigationBars/Bottombar.js/Bottombar'

function HomePage() {
  return (

    <div className=' bg-[#FAFAFA] w-full '>
      <Sidebar/>

      <div className=' w-full flex justify-center'>
      <Home/>
      </div>
      <RightSidebar/>
      <Bottombar/>
    </div>
  )
}

export default HomePage