import Ambulance from "./../media/homepage_ambulance.webp"
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

function Tagline(){
    const n = useNavigate()



    return(
        <div className="homepage_tagline">
            <div className="tagline_text">
                <h1>Pakistan's first <br /><b>E-Ambulance app</b></h1>
                <p>Emergency care, just a tap away</p>
                <motion.button whileTap={{scale: 0.8}} onClick={()=>{
                    n("/signup")

                }} >Signup for free!</motion.button>
            </div>
            <div className="tagline_ambulance">
                <motion.img  

                initial = {{
                    y: 200,
                }}

                transition = {{
                    y: {duration: .6}
                }}

                animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                  }}
                src={Ambulance} alt="Ambulance Karo - Pakistan's First Online Ambulance Booking App" />
            </div>
        </div>
    )
}

export default Tagline;