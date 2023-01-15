import { useEffect, useState } from "react";
import Profile from "../UserDashboard/Profile"
import Donations from "./Donations";
import Dashboard from "./Dashboard";
import Ambulances from "./Ambulances";
import Drivers from "./Drivers";
import Paramedics from "./Paramedics";
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet";


const SudoDashboard = () =>{

    // sidebar state
    const [sidebarName, setSidebarName] = useState("Dashboard")
    const n = useNavigate()

    return (
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <div className="welcome_header">
            <i className="fa-solid fa-bars" onClick={()=>{
                document.querySelector(".dashboard_sidebar").style.left = 0
            }} ></i>
            <h3>Hello, Sudo!</h3>
            </div>
            
            <div className="dashboard_main_container">
            <div className="dashboard_sidebar">
                <p><i className="fa-solid fa-house"></i> &nbsp;Home</p>
                <ul>
                    <li  onClick={()=>{
                        setSidebarName("Dashboard")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}  className={sidebarName == "Dashboard" ? "active_sidebar" : ""}  ><i className="fa-solid fa-grid-horizontal"></i> &nbsp; Dashboard</li>
                    <li className={sidebarName == "Ambulances" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Ambulances")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}  ><i className="fa-solid fa-truck-medical"></i> &nbsp; Ambulances</li>
                    <li   className={sidebarName == "Paramedics" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Paramedics")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-user-doctor"></i> &nbsp; Paramedics</li>

                    <li   className={sidebarName == "Drivers" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Drivers")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-id-card"></i> &nbsp; Drivers</li>

                    <li   className={sidebarName == "Donations" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Donations")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-dollar-sign"></i> &nbsp; Donations</li>

                    <li    className={sidebarName == "Profile" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Profile")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-gear"></i> &nbsp; Edit Profile</li>
                    
                    <li onClick={()=>{
                        localStorage.clear()
                        n("/")
                    }}  ><i class="fa-solid fa-sign-out"></i> &nbsp; Logout</li>
                </ul>
            </div>
            <div className="dashboard_content" onClick={()=>{
                document.querySelector(".dashboard_sidebar").style.left = "-100%"
            }} >
                {sidebarName == "Dashboard" ? <Dashboard /> : <></>}
                {sidebarName == "Donations" ? <Donations /> : <></>}
                {sidebarName == "Drivers" ? <Drivers /> : <></>}
                {sidebarName == "Paramedics" ? <Paramedics /> : <></>}
                {sidebarName == "Profile" ? <Profile /> : <></>}
                {sidebarName == "Ambulances" ? <Ambulances /> : <></>}
            </div>
        </div>
        </>
    )
}
export default SudoDashboard;