import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../../Components/Admin/AdminSidebar/AdminSideBar'

function AdminStructure() {
  return (
    <div>
        <section className="flex gap-6">
            <AdminSideBar/>
            <Outlet/>
        </section>
    </div>
  )
}

export default AdminStructure