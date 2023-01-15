import {Line} from "react-chartjs-2"
import {Chart} from "chart.js/auto"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import url from "../ServerUrl"

const Dashboard = () => {

    const [ambulanceCount, setAmbulanceCount] = useState(0)
    const [paramedicCount, setParamedicCount] = useState(0)
    const [driverCount, setDriverCount] = useState(0)
    const [donationCount, setDonationCount] = useState(0)


    const getCount = async() =>{

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
    
        let bodyContent = JSON.stringify({
            "query": "sumDonation"
        });
        
        let response = await fetch(`${url}/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data1 = await response.json();

        bodyContent = JSON.stringify({
            "query": "sumDriver"
        });
        response = await fetch(`${url}/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data2 = await response.json();

        bodyContent = JSON.stringify({
            "query": "sumParamedic"
        });
        response = await fetch(`${url}/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data3 = await response.json();

        bodyContent = JSON.stringify({
            "query": "sumAmbulance"
        });
        response = await fetch(`${url}/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data4 = await response.json();

        setDonationCount(data1.sum)
        setDriverCount(data2.sum)
        setParamedicCount(data3.sum)
        setAmbulanceCount(data4.sum)



    }

    useEffect(()=>{
        getCount()
    },[])

    const test = {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        datasets: [{
            label: "no of users",
            data: [12,14,15,15,16,18,16,15,17,20,23,21,25,27,25,28,30,28,32,32,32,28,35],
            backgroundColor: ["white"],
            borderColor: ["#ff5049"]
        }]
  
    }

    return(
        <div className="admin_ambulances">
            <h1>Dashboard</h1>
            <div className="active_staffs">
                <motion.div whileTap={{scale: 0.8}} className="ambulances_active_count">
                    <p>Active Ambulances</p>
                    <h1>{ambulanceCount}</h1>
                    <i className="fa-solid fa-ambulance absolute_icon"></i>
                </motion.div>
                <motion.div whileTap={{scale: 0.8}} className="ambulances_active_count">
                    <p>Active Paramedics</p>
                    <h1>{paramedicCount}</h1>
                    <i className="fa-solid fa-user-doctor absolute_icon"></i>

                </motion.div>
                <motion.div whileTap={{scale: 0.8}} className="ambulances_active_count">
                    <p>Active Drivers</p>
                    <h1>{driverCount}</h1>
                    <i className="fa-solid fa-id-card absolute_icon"></i>

                </motion.div>
                <motion.div whileTap={{scale: 0.8}} className="ambulances_active_count">
                    <p>Donations</p>
                    <h1>{donationCount}</h1>
                    <i className="fa-solid fa-dollar absolute_icon"></i>

                </motion.div>
            </div>
            <h2 className="dashboard_chart_heading" >Daily Incoming Requests</h2>
            <Line data={test} />
        </div>
    )
}
export default Dashboard;