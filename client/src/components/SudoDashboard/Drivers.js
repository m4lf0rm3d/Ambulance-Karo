
import { motion } from "framer-motion";

const Drivers = () => {

    // add ambulance
    const addDriver = () => {
        document.getElementById("blur_overlay").style.display = "block"
        document.getElementById("custom_model_add_ambulance").style.top = "50%"

    }

    return(
        <div className="admin_ambulances">

            <div id="blur_overlay"></div>

            <div className="custom_model_update_ambulance" id="custom_model_update_ambulance">
                <h2>Update Driver</h2>
                <p>First name:</p>
                <input type="text" placeholder="Enter first name" />
                <p>Last name:</p>
                <input type="text" placeholder="Enter last name" />
                <p>Email:</p>
                <input type="email" placeholder="Enter email" />
                <p>Enter phone no:</p>
                <input type="number" placeholder="Enter driver phone number" />
                <p>Ambulance ID:</p>
                <input type="number" placeholder="Enter ambulance id" />
                <p>License no:</p>
                <input type="text" placeholder="Enter license no" />
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
                <h2>Add Driver</h2>
                <p>First name:</p>
                <input type="text" placeholder="Enter first name" />
                <p>Last name:</p>
                <input type="text" placeholder="Enter last name" />
                <p>Email:</p>
                <input type="email" placeholder="Enter email" />
                <p>Enter phone no:</p>
                <input type="number" placeholder="Enter driver phone number" />
                <p>Ambulance ID:</p>
                <input type="number" placeholder="Enter ambulance id" />
                <p>License no:</p>
                <input type="text" placeholder="Enter license no" />
                
            
            <div style={{textAlign: "center"}} >
                <motion.button whileTap={{scale: 0.9}} style={{background: "transparent",color: "#ff5049"}} onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_add_ambulance").style.top= "-100%"
                }} >Cancel</motion.button>
                <motion.button whileTap={{scale: 0.9}} >Add</motion.button>

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
                <h2>Are you sure you want to delete driver with ID 10092?</h2>
                <motion.button whileTap={{scale: 0.9}} className="yes" >Yes</motion.button>
                <motion.button whileTap={{scale: 0.9}} className="no"  onClick={()=>{
                    document.getElementById("blur_overlay").style.display = "none"
                    document.getElementById("custom_model_delete").style.top= "-100%"
                    
                }}  >No</motion.button>
            </div>



            <h1>Drivers</h1>
            <p style={{marginLeft: "20px",color: "#ff5049"}} ><b>Available Drivers (6)</b> <motion.button className="add_ambulance_button" onClick={addDriver}  whileTap={{scale: 0.9}}  >Add <i className="fa-solid fa-plus"></i></motion.button></p>


            <div className="ambulance_table" style={{overflowX: "scroll"}} >

            <table className="history_table">
                <tr className="history_table_header">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Ambulance ID</th>
                    <th>License No</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="canceled">Busy</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="canceled">Busy</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="canceled">Busy</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="fulfilled">Free</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="canceled">Busy</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                <tr>
                    <td>10004</td>
                    <td>Shoaib</td>
                    <td>Mailk</td>
                    <td>shoaib@gmail.com</td>
                    <td>03151789081</td>
                    <td>109821</td>
                    <td>43920563487</td>
                    <td className="fulfilled">Free</td>
                    <td><button  onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_update_ambulance").style.top= "50%"
                    }}  ><i className="fa-solid fa-pen"></i></button></td>
                    <td><button onClick={()=>{
                        document.getElementById("blur_overlay").style.display = "block"
                        document.getElementById("custom_model_delete").style.top= "50%"
                    }} ><i className="fa-solid fa-trash"></i></button></td>

                </tr>
                


                
            </table></div>


        </div>
    )
}
export default Drivers;