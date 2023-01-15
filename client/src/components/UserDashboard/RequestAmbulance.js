import { useEffect } from "react"
import { useState } from "react"
import spinner from "../../media/spinner.gif"
import makeMessage from "../MakeMessage"
import url from "../ServerUrl"
import verifyLocation from "../verifyLocation"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const RequestAmbulance = () => {

    const redirect = useNavigate()
    const [ambType, setAmbType] = useState("basic")
    const [oxy, setOxy] = useState(false)
    const [bp, setBp] = useState(false)
    const [wh, setWh] = useState(false)
    const [pd, setPd] = useState(false)
    const [driver, setDriver] = useState(null)
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

    

    const callAmbulance = async() =>{
        

        let facilityStr = oxy ? "Oxyegn Cylinder, " : ""
        facilityStr += bp ? "Bloodpressure, " : ""
        facilityStr += wh ? "Wheelchair, " : ""
        facilityStr += pd ? "Paramedic" :""

        let d = new Date()
        d = String(d)
        let i1 = d.indexOf(" GMT")
        const date = d.substring(0,i1)
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
           
        let bodyContent = JSON.stringify({
            "time": date,
            "location": userLocation,
            "ambType": ambType,
            "facility": facilityStr
        });
        
        let response = await fetch(`${url}/call`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        if(response.status !== 200) {
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Server error","#ff0000","temp_6B")
            setTimeout(() => {
                document.getElementById("temp_6B").remove()
            },3000)
            return
        }
        
        localStorage.setItem("ambulanceLoading",true)
        document.getElementById('ambulance_call').style.display = "none"
        document.getElementById('ambulance_loading').style.display = "block"


        const fetchDriver = async() =>{
            let response = await fetch(`${url}/fetchDriver`, { 
                method: "POST",
                headers: headersList
            });
                
            if(response.status === 200){
                let data = await response.json();
                setDriver(data)
                localStorage.setItem("ambulanceLoading",false)
                document.getElementById('ambulance_loading').style.display = "none"
                clearInterval(interval_id_driver)

            }
        }

        const interval_id_driver = setInterval(fetchDriver,1000);

    }

    const drivingStatus = async() => {
        document.getElementById('ambulance_loading').style.display = "none"
        localStorage.setItem("ambulanceLoading",false)

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }

        let response = await fetch(`${url}/requestStatus`, { 
            method: "POST",
            headers: headersList
        });
        
        let data = await response.json();

        if(data.message === 'done'){
            clearInterval(interval_id_driving)
            makeMessage("fa-solid fa-circle-check","	#198754","Ride Completed","#198754","temp_6B")

            setTimeout(() => {
                document.getElementById("temp_6B").remove()
                window.location.reload()
                document.getElementById('ambulance_call').style.display = "block"
                document.getElementById('wxyz').style.display = "none"
                
            }, 3000);
        }
    }
    let interval_id_driving;

    if(driver){
        interval_id_driving = setInterval(drivingStatus,4000);
    }

    return(
        <>
        {driver ? <div id="wxyz" className="driver_details_ambulance_found">
            <h1>Your Ambulance is on its way!</h1>
            <motion.div whileTap={{scale: 0.9}} className="ambulance_driver_details_card custom_card">
                {/* <h2>Driver Information</h2> */}
                <h2>{driver?.firstname} {driver?.lastname} </h2>
                <p>{driver?.contact}</p>
                <p>Location: <a target={"_blank"} href={`https://google.com/maps/search/${driver?.location}`}>Open Maps</a></p>
                {/* <button>Cancel <i class="fa-solid fa-xmark"></i></button> */}
                <span>10 mins away</span>
                <i className="fa-solid fa-ambulance absolute_icon"></i>
            </motion.div>
        </div> : <></>}
        
        {localStorage.getItem("ambulanceLoading") === 'true' ? 
        <div id="ambulance_loading"  style={{display: "block"}}  className="ambulance_waiting_state">
            <img src={spinner} alt="" />
            <p><b>Searching for Ambulance</b></p>
            <p>(Expected waiting time: 1-2 minutes)</p>
        </div> : <div id="ambulance_loading" style={{display: "none"}} className="ambulance_waiting_state">
            <img src={spinner} alt="" />
            <p><b>Searching for Ambulance</b></p>
            <p>(Expected waiting time: 1-2 minutes)</p>
        </div>}
        {localStorage.getItem("ambulanceLoading") !== 'true' ?  <div id="ambulance_call" className="signup_container" style={{border: "none"}} >
            <h1>Call Ambulance Now!</h1>
            
            <p>Select Ambulance Type:</p>
            <select name="" id="" onChange={e => setAmbType(e.target.value)} >
                <option value="basic">Basic Ambulance</option>
                <option value="advance">Advance Ambulance</option>
                <option value="mortuary">Mortuary Ambulance</option>
                <option value="patient">Patient Transport Ambulance</option>
            </select>
            
            <p>Ambulance must have:</p>
            <div className="custom_checkbox" >
            <input type="checkbox" name="oxygen_cylinder" id="oxygen_cylinder" placeholder="Enter your password" onChange={()=>setOxy(!oxy)} />
            <label htmlFor="oxygen_cylinder">Oxygen Cylinder</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="blood_pressure" id="blood_pressure" placeholder="Enter your password"  onChange={()=>setBp(!bp)}  />
            <label htmlFor="blood_pressure">Blood Pressure Machine</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Wheelchair" id="Wheelchair" placeholder="Enter your password"  onChange={()=>setWh(!wh)}  />
            <label htmlFor="Wheelchair">Wheelchair</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Paramedic" id="Paramedic" placeholder="Enter your password"  onChange={()=>setPd(!pd)}  />
            <label htmlFor="Paramedic">Paramedic</label>
            </div>
            
            <motion.button  whileTap={{scale: 0.8}} onClick={callAmbulance}  >Call Now! <i className="fa-solid fa-phone"></i> </motion.button>
            
        </div>
        : <></> }
        </>
    )
}

export default RequestAmbulance;