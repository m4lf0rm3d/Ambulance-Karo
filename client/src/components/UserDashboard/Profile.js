import { useState } from "react";
import makeMessage from "../MakeMessage";
import {motion} from "framer-motion"
import url from "../ServerUrl"
import { redirect } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {

    const [edit, setEdit] = useState(false)
    const [cancel, setCancel] = useState(false)

    // profile state
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [genderInp, setGender] = useState("")
    const [ageInp, setAge] = useState("")
    // const [emailInp, setEmail] = useState(email)
    const [phone, setPhone] = useState("")

    const fetchProfile = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
           
        let bodyContent = ""
        
        let response = await fetch(`${url}/self`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        
        let data = await response.json();
        setFirstName(data.firstname)
        setLastName(data.lastname)
        setAge(data.age)
        setGender(data.gender)
        setPhone(data.contact)
    }

    useEffect(()=>{
        fetchProfile()
    },[])


    // update user profile information
    const updateProfile = async() => {
        
        
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
           
        let bodyContent = JSON.stringify({
            "firstname":firstName,
            "lastname":lastName,
            "gender":genderInp,
            "age":ageInp,
            "phone":phone
        });
        
        let response = await fetch(`${url}/update`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        if(response.status !== 200){
            localStorage.clear()
            redirect("/")
            return <></>
        }
           

        setEdit(!edit)

        makeMessage("fa-solid fa-circle-check","	#198754","Profile Update Success!","#198754","update_message_profile")
        setTimeout(() => {
            document.getElementById("update_message_profile").remove()
            window.location.reload()
        }, 3000);
    }

    return(
        <div className="signup_container"  style={{border: "none"}} >

            <h1>Edit Profile</h1>
            <p style={{marginTop: "20px"}} >First Name:</p>
            <input type="text" onChange={e=>setFirstName(e.target.value)} defaultValue={firstName} disabled={!edit} />
            <p>Last Name:</p>
            <input type="text"  onChange={e=>setLastName(e.target.value)} defaultValue={lastName}  disabled={!edit} />
            <p>Gender:</p>
            <select  onChange={e=>setGender(e.target.value)} value={genderInp}   disabled={!edit}  >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <p>Age:</p>
            <input type="number"  onChange={e=>setAge(e.target.value)} defaultValue={ageInp}   disabled={!edit}  />
            {/* <p>Email:</p>
            <input type="text"   onChange={e=>setEmail(e.target.value)} defaultValue={emailInp}     disabled={!edit} /> */}
            <p>Phone No:</p>
            <input type="number"  onChange={e=>setPhone(e.target.value)} defaultValue={phone}  disabled={!edit}  />
            {!edit ? <motion.button   whileTap={{scale: 0.8}}  onClick={()=>{
                setEdit(true)
                
                }} >Edit <i className="fa-solid fa-user-pen"></i></motion.button> : <></>}
            <div  className="update_profile_buttons" style={{display: edit ? "block" : "none",marginBottom: "100px"}} >
                <motion.button   whileTap={{scale: 0.8}}   id="previous" onClick={updateProfile} ><i className="fa-solid fa-check"></i> Update </motion.button>

                <motion.button   whileTap={{scale: 0.8}}  id="next" style={{background: "transparent",color: "#ff5049",border: "1px solid #ff5049"}} onClick={()=>{
                    setCancel(!cancel)
                    setEdit(!edit)
                    }} >Cancel </motion.button>

            </div>
        </div>
    )
}
export default Profile;