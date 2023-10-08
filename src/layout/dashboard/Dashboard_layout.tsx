import React from 'react'
import Sidebar from '../../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard_layout = () => {
    return (
        <>
            <Sidebar />
            {/* Aqui abajo ira cada seccion del Dashboard */}
            <div className="p-4 sm:ml-64">
                <Outlet />
            </div>

        </>
    )
}

export default Dashboard_layout