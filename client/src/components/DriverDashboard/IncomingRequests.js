import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import url from "../ServerUrl"
import verifyLocation from "../verifyLocation";
import makeMessage from "../MakeMessage";

const IncomingRequests = () => {
    const [driverStatus, setDriverStatus] = useState("requests")
    const [driverAcceptReqId, setDriverAcceptReqId] = useState(0)
    const [allRequests, setRequests] = useState([])
    const [resState, setReqState] = useState(true)
    const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
        'token': localStorage.token
       }
       

       const [userLocation, setUserLocation] = useState({})

       const locationStatus = async() =>{
           await verifyLocation().then(async l =>{
               
               setUserLocation(`${l[0]},${l[1]}`)
   
           }).catch(async e=>{
               makeMessage("fa-solid fa-circle-xmark","#ff0000","Please allow location","#ff0000","temp_1y")
               setTimeout(async() => {
                   document.getElementById("temp_1y").remove()
                   await verifyLocation().then(l =>{
                       setUserLocation(`${l[0]},${l[1]}`)
                   }).catch(e=>{
                       makeMessage("fa-solid fa-circle-xmark","#ff0000","Location is required to run the app. Please allow location!","#ff0000","temp_1y")
                       setTimeout(() => {
                           document.getElementById("temp_1y").remove()
                           window.location.replace("/")
   
                       }, 3000);
                   })
               }, 3000);
           })
       }
   
       useEffect(()=>{
           locationStatus()
       },[])
      
    
    const fetchRequests = async() =>{
        let response = await fetch(`${url}/fetchRequests`, { 
            method: "POST",
            headers: headersList
        });
        let data = await response.json();
        setRequests(data)
    }

    const accpetRequest = async(req_id) => {
        setReqState(false)
        setDriverStatus("riding")
        setDriverAcceptReqId(req_id)


        let bodyContent = JSON.stringify({
            "requestid": req_id.requestid,
            "loc": userLocation
        });
        
        let response = await fetch(`${url}/accept`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

    }

    const completeRequest = async(req_id) => {
        setReqState(false)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
           
        let bodyContent = JSON.stringify({
            "requestid": req_id
        });
        console.log(req_id);
        let response = await fetch(`${url}/complete`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        

    }


    useEffect(()=>{
        if(resState){
            setInterval(() => {
                fetchRequests()
            }, 1000);
        }
        
    },[])

    return(
        <div className="signup_container" style={{border: "none"}} >
            {driverStatus == "requests" ?
            <>
            <h1>Requests ({allRequests.length})</h1>

            {allRequests.map((item,i) => {
                
                return <div className="ambulance_driver_details_card">
                    <p>Request ID: {item.requestid}</p>
                    <p>{item.firstname} {item.lastname}</p>
                <p>{item.contact}</p>
                    {item.ambulancetype == "basic" ? <p>Ambulance type: Basic Ambulance</p> : <></>}
                    {item.ambulancetype == "advance" ? <p>Ambulance type: Advance Ambulance</p> : <></>}
                    {item.ambulancetype == "mortuary" ? <p>Ambulance type: Mortuary Ambulance</p> : <></>}
                    {item.ambulancetype == "patient" ? <p>Ambulance type: Patient Transport Ambulance</p> : <></>}
                    <p>Location: <a target={"_blank"} href={`https://google.com/maps/search/${item.location}`}>Open Maps</a></p>
                <motion.button whileTap={{scale: 0.9}}  onClick={() => accpetRequest(item)} className="accept_request" >Accept <i className="fa-solid fa-circle-check"></i></motion.button>
                <span>{Math.floor((new Date().getTime() - new Date(item.time).getTime())/(1000*60))} mins ago</span><i className="fa-solid fa-ambulance absolute_icon"></i>
                </div>
                
            })}

            </> : <></> }


            {driverStatus == "riding" ?
            <>
            <h1>Riding</h1>
            <div className="ambulance_driver_details_card">
            <p>Request ID: {driverAcceptReqId.requestid}</p>
                   <p>{driverAcceptReqId.firstname} {driverAcceptReqId.lastname}</p>
                <p>{driverAcceptReqId.contact}</p>
                    {driverAcceptReqId.ambulancetype == "basic" ? <p>Ambulance type: Basic Ambulance</p> : <></>}
                    {driverAcceptReqId.ambulancetype == "advance" ? <p>Ambulance type: Advance Ambulance</p> : <></>}
                    {driverAcceptReqId.ambulancetype == "mortuary" ? <p>Ambulance type: Mortuary Ambulance</p> : <></>}
                    {driverAcceptReqId.ambulancetype == "patient" ? <p>Ambulance type: Patient Transport Ambulance</p> : <></>}
                    <p>Location: <a target={"_blank"} href={`https://google.com/maps/search/${driverAcceptReqId.location}`}>Open Maps</a></p>
                    
                    
                <motion.button whileTap={{scale: 0.9}} onClick={()=>completeRequest(driverAcceptReqId.requestid)}  className="reached_location" >Complete Request <i className="fa-solid fa-circle-check"></i></motion.button>
                <span>{Math.floor((new Date().getTime() - new Date(driverAcceptReqId.time).getTime())/(1000*60))} mins ago</span>
                <i className="fa-solid fa-ambulance absolute_icon"></i>
            </div></> : <></> }

        </div>
    )
}
export default IncomingRequests;