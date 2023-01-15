import { motion } from "framer-motion"
import { useState } from "react";
import Header from "./Header";
import makeMessage from "./MakeMessage";
import Helmet from "react-helmet";

function Contact(){

    const [email,setEmail] = useState("")
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [text, setText] = useState("")

    const sendMail = async() =>{
        if(email == "" || name == "" || contact == "" || text == ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Field(s) are empty!","#ff0000","a0289u3")
            setTimeout(() => {
                document.getElementById("a0289u3").remove()
            }, 3000);
            return
        }
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
           
        let bodyContent = JSON.stringify({
            "access_key": "70662f1c-5629-4e46-9159-03cc3abeb537",
            "name":name,
            "email": email,
            "message": "Contact No: "+contact + ` Message: `+text
        });
           
        let response = await fetch("https://api.web3forms.com/submit", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        if(response.status === 200){
            makeMessage("fa-solid fa-circle-check","	#198754","Message Sent!","#198754","temp_61B")
            setTimeout(() => {
                document.getElementById("temp_61B").remove()
            }, 3000);
            return
        }
        makeMessage("fa-solid fa-circle-xmark","#ff0000","Something went wrong!","#ff0000","a0289u3")
        setTimeout(() => {
            document.getElementById("a0289u3").remove()
        }, 3000);
        return
           
    }


    return(
        <>

<Helmet>
            <title>Contact</title>
            <meta
      name="description"
      content="Ambulance Karo — Pakistan's first
      E-Ambulance app - Ambulance at your place in just a tap"
    />
        </Helmet>
        <div className="main_homepage_blob_image">
            <div className="main_content">
                <Header />
                <div className="signup_container">
                    <h1>Contact us</h1>
                    <p>Email:</p>
                    <input type="email" placeholder="Enter your email address" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <p>Full Name:</p>
                    <input onChange={(e)=>{setName(e.target.value)}}  type="text" placeholder="Enter your full name"  />
                    <p>Contact no:</p>
                    <input onChange={(e)=>{setContact(e.target.value)}} type="tel" placeholder="Enter your contact number"  />
                    <p>Message:</p>
                    <textarea onChange={(e)=>{setText(e.target.value)}} name="" id="" placeholder="Enter your message" cols="30" rows="10"></textarea>
                    <motion.button  whileTap={{scale: 0.8}}  onClick={sendMail} >Send <i className="fa-solid fa-paper-plane"></i> </motion.button>
                    
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;