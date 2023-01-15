
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../media/logo.png"

function Header(){
    const redirect = useNavigate()

    return(
        <header>
            <div className="header_item">
            <i onClick={()=>{
                        document.getElementById("header_links").style.left = "0"
                    }} className="fa-solid fa-bars open_nav"></i>

                <img onClick={()=>{
                    window.location.replace("/")
                }} className="logo" src={logo} alt="Ambulance Karo Logo" />

                <ul className="header_links" id="header_links">
                    <li onClick={()=>redirect("/about")} >About</li>
                    <li onClick={()=>redirect("/contact")} >Contact</li>

                    <motion.li whileTap={{scale: 0.8}} onClick={()=>{
                        redirect("/login")
                    }} >Login <i className="fa-solid fa-user"></i></motion.li>

                    <i onClick={()=>{
                        document.getElementById("header_links").style.left = "-100%"
                    }} className="fa-solid fa-xmark cancel_nav"></i>
                    
                </ul>
            </div>
        </header>
    )
}

export default Header;