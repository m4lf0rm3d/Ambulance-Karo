
import { Link, redirect, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import makeMessage from "./MakeMessage";
import Header from "./Header";
import url from "./ServerUrl";
import Helmet from "react-helmet";

function Login(){

    // user defined email and password states
    const [inputEmail,setInputEmail] = useState("") 
    const [inputPassword,setInputPassword] = useState("")

    const redirect = useNavigate()

    useEffect(()=>{
        if(localStorage.token){
            redirect("/dashboard")
        }
    },[])

    // when user clicks on Login Button
    const loginUser = async() => {
        
        // input validation 
        if(inputEmail === "" && inputPassword !== ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Please enter your email","#ff0000","temp_1x")
            setTimeout(() => {
                document.getElementById("temp_1x").remove()
            }, 3000);
            return
            
        }
        if(inputEmail !== "" && inputPassword === ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Please enter your password","#ff0000","temp_2x")
            setTimeout(() => {
                document.getElementById("temp_2x").remove()
            }, 3000);
            return
        }
        if(inputEmail === "" && inputPassword === ""){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Please enter your email and password","#ff0000","temp_3x")
            setTimeout(() => {
                document.getElementById("temp_3x").remove()
            }, 3000);
            return
        }
        let flag = true
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail)) flag = false;


        if(flag){
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Invalid email address","#ff0000","temp_4x")
            setTimeout(() => {
                document.getElementById("temp_4x").remove()
            }, 3000);
            return
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }
           
        let bodyContent = JSON.stringify({
            "email":inputEmail,
            "passwd":inputPassword
        });
        
        try {
            let response = await fetch(`${url}/login`, { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            if(response.status === 200){
                const output = await response.json()
                localStorage.setItem('token',output.token)
                makeMessage("fa-solid fa-circle-check","	#198754","Login Success!","#198754","temp_6B")
                setTimeout(() => {
                    document.getElementById("temp_6B").remove()
                    window.location.replace("/dashboard")
                }, 3000);
                return
            }

            makeMessage("fa-solid fa-circle-xmark","#ff0000","Incorrect email or password!","#ff0000","temp_1A")
            setTimeout(() => {
                document.getElementById("temp_1A").remove()
            }, 3000);

        } catch (error) {
            makeMessage("fa-solid fa-circle-xmark","#ff0000","Something went wrong!","#ff0000","temp_1A")
            setTimeout(() => {
                document.getElementById("temp_1A").remove()
            }, 3000);
            return
        }
        
    }


    return(
        <>
        <Helmet>
            <title>Login</title>
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
                    <h1>Login</h1>
                    <p>Email:</p>
                    <input type="email" placeholder="Enter your email address" onChange={(e)=>{setInputEmail(e.target.value)}}/>
                    <p>Password:</p>
                    <input type="password" placeholder="Enter your password" onChange={(e)=>{setInputPassword(e.target.value)}} />
                    
                    <motion.button  whileTap={{scale: 0.9}}  onClick={loginUser} >Login <i className="fa-solid fa-right-to-bracket"></i> </motion.button>
                    <Link to="/signup">Don't have an account? Signup using this link</Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;