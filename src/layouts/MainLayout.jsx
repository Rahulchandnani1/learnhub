import "../styles/MainLayout.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
const [sidebarOpen, setSidebarOpen] =
useState(false);
    return (

        <div className="layout">

        

<Sidebar
sidebarOpen={sidebarOpen}
closeSidebar={()=>
setSidebarOpen(false)}
/>
            <div className="content">

                 <Navbar
toggleSidebar={()=>
setSidebarOpen(!sidebarOpen)}
/>

                <main className="page">

                    <Outlet />

                </main>

            </div>

        </div>

    );
};

export default MainLayout;