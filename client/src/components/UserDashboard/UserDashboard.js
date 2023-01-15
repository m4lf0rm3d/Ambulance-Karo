import { useEffect, useState } from "react";
import Donate from "./Donate";
import History from "./History";
import RequestAmbulance from "./RequestAmbulance";
import Profile from "./Profile"
import { useNavigate } from "react-router-dom";
import url from "../ServerUrl";
import Helmet from "react-helmet";


const UserDashboard = () =>{

    // sidebar state
    const [sidebarName, setSidebarName] = useState("RequestAmbulance")
    const [firstname, setFirstname] = useState('')
    const redirect = useNavigate()

    if(!localStorage.token) redirect("/");


    const fetchSelf = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "token": localStorage.token
        }
           
        let response = await fetch(`${url}/self`, { 
            method: "POST",
            headers: headersList
        });

        if(response.status !== 200) redirect("/");

        let data = await response.json();
        setFirstname(data.firstname)
    }

    useEffect(()=>{
        fetchSelf()
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
                        setSidebarName("RequestAmbulance")
                        document.querySelector(".dashboard_sidebar").style.left = "-100%"

                    }}  className={sidebarName == "RequestAmbulance" ? "active_sidebar" : ""}  ><i class="fa-solid fa-phone"></i> &nbsp; Request Ambulance</li>
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
                {sidebarName == "RequestAmbulance" ? <RequestAmbulance /> : <></>}
                {sidebarName == "History" ? <History /> : <></>}
                {sidebarName == "Donate" ? <Donate /> : <></>}
                {sidebarName == "Profile" ? <Profile /> : <></>}
            </div>
        </div>
        </>
    )
}
export default UserDashboard;