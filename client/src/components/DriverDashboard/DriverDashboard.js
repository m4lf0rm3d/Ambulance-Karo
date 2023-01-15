import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Donate from "../UserDashboard/Donate";
import History from "../UserDashboard/History";
import IncomingRequests from "./IncomingRequests";
import Profile from "../UserDashboard/Profile"
import url from "../ServerUrl";
import Helmet from "react-helmet";

const DriverDashboard = () =>{

    // sidebar state
    const [sidebarName, setSidebarName] = useState("IncomingRequests")
    const [firstname, setFirstName] = useState("")
    const redirect = useNavigate()

    const fetchProfile = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
        
        let response = await fetch(`${url}/self`, { 
            method: "POST",
            headers: headersList
        });
        
        let data = await response.json();
        setFirstName(data.firstname)
    }

    useEffect(()=>{
        fetchProfile()
    },[])

    return (
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <div className="welcome_header">
            <i className="fa-solid fa-bars" onClick={()=>{
                document.querySelector(".dashboard_sidebar").style.left = 0
            }} ></i>
            <h3>Hello, {firstname}!</h3>
            </div>
            
            <div className="dashboard_main_container">
            <div className="dashboard_sidebar">
                <p><i className="fa-solid fa-house"></i> &nbsp;Home</p>
                <ul>
                    <li  onClick={()=>{
                        setSidebarName("IncomingRequests")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}  className={sidebarName == "IncomingRequests" ? "active_sidebar" : ""}  ><i className="fa-solid fa-phone-arrow-down-left"></i> &nbsp; Incoming Requests</li>
                    <li className={sidebarName == "History" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("History")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}  ><i className="fa-solid fa-clock-rotate-left"></i> &nbsp; History</li>
                    <li   className={sidebarName == "Donate" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Donate")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-hand-holding-dollar"></i> &nbsp; Donate</li>
                    <li    className={sidebarName == "Profile" ? "active_sidebar" : ""} onClick={()=>{
                        setSidebarName("Profile")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}    ><i className="fa-solid fa-gear"></i> &nbsp; Edit Profile</li>
                    
                    <li  onClick={()=>{
                        localStorage.clear()
                        redirect("/")
                    }}  ><i class="fa-solid fa-sign-out"></i> &nbsp; Logout</li>
                </ul>
            </div>
            <div className="dashboard_content" onClick={()=>{
                document.querySelector(".dashboard_sidebar").style.left = "-100%"
            }} >
                {sidebarName == "IncomingRequests" ? <IncomingRequests /> : <></>}
                {sidebarName == "History" ? <History /> : <></>}
                {sidebarName == "Donate" ? <Donate /> : <></>}
                {sidebarName == "Profile" ? <Profile /> : <></>}
            </div>
        </div>
        </>
    )
}
export default DriverDashboard;