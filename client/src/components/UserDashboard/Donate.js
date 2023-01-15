
import { motion } from "framer-motion";
import { useState } from "react";
import makeMessage from "../MakeMessage";
import url from "../ServerUrl"

const Donate = () => {

    const [amount, setAmount] = useState(1000)

    const userDonate = async() => {

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
           }
           
        let bodyContent = JSON.stringify({
            "donatedOn": String(new Date()),
            "donatedAmount": amount
        });
        
        let response = await fetch(`${url}/donate`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
           

        makeMessage("fa-solid fa-circle-check","	#198754","Thanks for donation! Our team will contact you soon!","#198754","donate_by_user")
        setTimeout(() => {
            document.getElementById("donate_by_user").remove()
            
        }, 3000);
    }

    return(
        <div className="signup_container" style={{border: "none"}} >
            <h1>Donate</h1>

            <p className="donation_message" >Please consider making a donation to support the development and maintenance of our E-Ambulance app.</p>
            <p>Select amount (in PKR):</p>
            <select name="" id="" onChange={e => setAmount(e.target.value)} >
                <option value="1000">PKR 1000</option>
                <option value="5000">PKR 5000</option>
                <option value="10000">PKR 10000</option>
                <option value="50000">PKR 50000</option>
            </select>
            <motion.button   whileTap={{scale: 0.8}} onClick={userDonate}  >Donate <i className="fa-solid fa-hand-holding-dollar"></i></motion.button>
        </div>
    )
}
export default Donate;