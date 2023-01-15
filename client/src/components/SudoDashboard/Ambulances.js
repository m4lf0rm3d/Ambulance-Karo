
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import url from "../ServerUrl"
import makeMessage from "../MakeMessage"

const Ambulances = () => {

    const [ambulances, setAmbulances] = useState([])

    const [driverIdAdd, setDriverIdAdd ] = useState("")
    const [paramedicIdAdd,setParamedicIdAdd ] = useState("")
    const [ambNoPlateAdd,setAmbNoPlateAdd ] = useState("")
    const [ambTypeAdd, setAmbTypeAdd ] = useState("")
    const [oxyAdd, setOxyAdd ] = useState(false)
    const [bpAdd, setBpAdd] = useState(false)
    const [wcAdd, setWcAdd] = useState(false)
    const [pdAdd, setPdAdd] = useState(false)
    const [delId, setDelId] = useState(0)

    const getAllAmbulances = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
        let bodyContent = JSON.stringify({
            "query": "select sum(donatedAmount) as sum from donations;"
        });
        
        let response = await fetch(`http://${url}:5000/getAllAmbulances`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data = await response.json();
        data = data.reverse()
        setAmbulances(data)
           
    }

    useEffect(()=>{
        getAllAmbulances()
    },[])

    const delOnCLick = async(ambid) => {
        document.getElementById("blur_overlay").style.display = "block"
        document.getElementById("custom_model_delete").style.top= "50%"
        setDelId(ambid)
    }

    const deleteAmbulance = async() => {
        document.getElementById("blur_overlay").style.display = "none"
        document.getElementById("custom_model_delete").style.top= "-100%"
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "query": `delete from ambulance where ambulanceid=${delId};`
        });
        
        let response = await fetch(`http://${url}:5000/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        makeMessage("fa-solid fa-circle-check","	#198754","Ambulance has been deleted!","#198754","donate_by_user")
        setTimeout(() => {
            document.getElementById("donate_by_user").remove()
            
        }, 3000);
    }

    // add ambulance
    const addAmbulance = () => {
        document.getElementById("blur_overlay").style.display = "block"
        document.getElementById("custom_model_add_ambulance").style.top = "50%"
    }

    const addAmbServer = async() => {

        let facStr = document.getElementById("oxygen_cylinder").checked ? "Oxygen Cylinder, " : ""
        facStr += document.getElementById("blood_pressure").checked ? "Blood Pressure, " : ""
        facStr += document.getElementById("Wheelchair").checked ? "Wheelchair, " : ""
        facStr += document.getElementById("Paramedic").checked ? "Paramedic, " : ""

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
           }
           
        let bodyContent = JSON.stringify({
            "driverid":driverIdAdd,
            "paramedicid": paramedicIdAdd,
            "ambulancetype": ambTypeAdd,
            "ambfacilities": facStr,
            "noplate": ambNoPlateAdd
        });
        
        let response = await fetch(`http://${url}:5000/addAmbulance`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        document.getElementById("blur_overlay").style.display = "none"
        document.getElementById("custom_model_add_ambulance").style.top = "-100%"
        makeMessage("fa-solid fa-circle-check","	#198754","Ambulance has been added!","#198754","donate_by_user")
        setTimeout(() => {
            document.getElementById("donate_by_user").remove()
            
        }, 3000);
           
    }

    return(
        <div className="admin_ambulances">

            <div id="blur_overlay"></div>

            <div className="custom_model_update_ambulance" id="custom_model_update_ambulance">
                <h2>Update Ambulance</h2>
                <p>Driver ID:</p>
                <input type="number" placeholder="Enter ambulance driver id" />
                <p>Paramedic ID:</p>
                <input type="number" placeholder="Enter ambulance paramedic id" />
                <p>Ambulance No Plate:</p>
                <input type="text" placeholder="Enter ambulance no plate" />
                <p>Ambulance Type:</p>
            <select name="" id="">
                <option value="">Basic Ambulance</option>
                <option value="">Advance Ambulance</option>
                <option value="">Mortuary Ambulance</option>
                <option value="">Patient Transport Ambulance</option>
            </select>
            
            <p>Facilities:</p>
            <div className="custom_checkbox" >
            <input type="checkbox" name="oxygen_cylinder1" id="oxygen_cylinder1" placeholder="Enter your password" />
            <label htmlFor="oxygen_cylinder1">Oxygen Cylinder</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="blood_pressure1" id="blood_pressure1" placeholder="Enter your password" />
            <label htmlFor="blood_pressure1">Blood Pressure Machine</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Wheelchair1" id="Wheelchair1" placeholder="Enter your password" />
            <label htmlFor="Wheelchair1">Wheelchair</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Paramedic1" id="Paramedic1" placeholder="Enter your password" />
            <label htmlFor="Paramedic1">Paramedic</label></div>
            <div style={{textAlign: "center"}} >
                <motion.button whileTap={{scale: 0.9}} style={{background: "transparent",color: "#ff5049"}} onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_update_ambulance").style.top= "-100%"
                }} >Cancel</motion.button>
                <motion.button whileTap={{scale: 0.9}} >Update</motion.button>

            </div>
            <i className="fa-solid fa-circle-xmark close_button" onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_update_ambulance").style.top= "-100%"
                    
                }} ></i>
            </div>


            <div className="custom_model_add_ambulance" id="custom_model_add_ambulance">
                <h2>Add Ambulance</h2>
                <p>Driver ID:</p>
                <input type="number"  defaultValue={driverIdAdd} onChange={e => setDriverIdAdd(e.target.value)} placeholder="Enter ambulance driver id" />
                <p>Paramedic ID:</p>
                <input type="number"   defaultValue={paramedicIdAdd} onChange={e => setParamedicIdAdd(e.target.value)} placeholder="Enter ambulance paramedic id" />
                <p>Ambulance No Plate:</p>
                <input type="text"   defaultValue={ambNoPlateAdd} onChange={e => setAmbNoPlateAdd(e.target.value)} placeholder="Enter ambulance no plate" />
                <p>Ambulance Type:</p>
            <select name="" id=""   defaultValue={ambTypeAdd} onChange={e => setAmbTypeAdd(e.target.value)}  >
                <option value="basic">Basic Ambulance</option>
                <option value="advance">Advance Ambulance</option>
                <option value="mortuary">Mortuary Ambulance</option>
                <option value="patient">Patient Transport Ambulance</option>
            </select>
            
            <p>Facilities:</p>
            <div className="custom_checkbox" >
            <input type="checkbox" name="oxygen_cylinder" id="oxygen_cylinder" placeholder="Enter your password" />
            <label htmlFor="oxygen_cylinder">Oxygen Cylinder</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="blood_pressure" id="blood_pressure" placeholder="Enter your password" />
            <label htmlFor="blood_pressure">Blood Pressure Machine</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Wheelchair" id="Wheelchair" placeholder="Enter your password" />
            <label htmlFor="Wheelchair">Wheelchair</label>
            </div>
            <div className="custom_checkbox" >
            <input type="checkbox" name="Paramedic" id="Paramedic" placeholder="Enter your password" />
            <label htmlFor="Paramedic">Paramedic</label></div>
            <div style={{textAlign: "center"}} >
                <motion.button whileTap={{scale: 0.9}} style={{background: "transparent",color: "#ff5049"}} onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_add_ambulance").style.top= "-100%"
                }} >Cancel</motion.button>
                <motion.button onClick={addAmbServer} whileTap={{scale: 0.9}} >Add</motion.button>

            </div>
            <i className="fa-solid fa-circle-xmark close_button" onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_add_ambulance").style.top= "-100%"
                    
                }} ></i>
            </div>



            <div className="custom_model_delete" id="custom_model_delete">
                <i className="fa-solid fa-circle-xmark close_button" onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_delete").style.top= "-100%"
                    
                }} ></i>
                <h2>Are you sure you want to delete ambulance with ID {delId}?</h2>
                <motion.button whileTap={{scale: 0.9}} onClick={deleteAmbulance}  className="yes" >Yes</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="no"  onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_delete").style.top= "-100%"
                    
                }}  >No</motion.button>
            </div>



            <h1>Ambulances</h1>
            <p style={{marginLeft: "20px",color: "#ff5049"}} ><b>Available Ambulances ({ambulances.length})</b> <motion.button className="add_ambulance_button" onClick={addAmbulance}  whileTap={{scale: 0.9}}  >Add <i className="fa-solid fa-plus"></i></motion.button></p>


            <div className="ambulance_table" style={{overflowX: "scroll"}} >

            <table className="history_table">
                <tr className="history_table_header">
                    <th>ID</th>
                    <th>Type</th>
                    <th>Driver</th>
                    <th>Facility</th>
                    <th>No Plate</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>

                {ambulances.map(item => {
                    return <tr>
                        <td>{item.ambulanceid}</td>
                        {item.ambulancetype == "advance" ? <td>Advance Ambulance</td> : <></>}
                        {item.ambulancetype == "basic" ? <td>Basic Ambulance</td> : <></>}
                        {item.ambulancetype == "mortuary" ? <td>Mortuary Ambulance</td> : <></>}
                        {item.ambulancetype == "patient" ? <td>Patient Transport Ambulance</td> : <></>}
                        <td>{item.driverid}</td>
                        <td>{item.ambulancefacilities}</td>
                        <td>{item.noplate}</td>
                        {item.status == "Busy" ? <td className="active" >Busy</td> : <td className="fulfilled" >Free</td>}

                        <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={e => delOnCLick(item.ambulanceid)} ><i className="fa-solid fa-trash"></i></button></td>
                    </tr>
                })}

                

                
            </table></div>


        </div>
    )
}
export default Ambulances;