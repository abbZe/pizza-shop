import React from "react"
import Index from "../components/Header"
import { Outlet } from "react-router-dom"

const MainLayout: React.FC = () => {
    return (
        <div className="wrapper">
            <Index />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
