import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard_layout = () => {
    return (
        <>
            <Sidebar />
            {/* Aqui abajo ira cada seccion del Dashboard */}
            <div className="p-4 sm:ml-64 min-h-screen">
                <Outlet />
            </div>

        </>
    )
}

export default Dashboard_layout