import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Tagline from "./Tagline";
import Helmet from "react-helmet";

function Home(){

    const redirect = useNavigate()

    useEffect(()=>{

        if(localStorage.getItem("token")){
            redirect("/dashboard")  
        }
    },[])

    return(
        <>
        <Helmet>
            <title>Ambulance Karo — Pakistan's first
      E-Ambulance app</title>
            <meta
      name="description"
      content="Ambulance Karo — Pakistan's first
      E-Ambulance app - Ambulance at your place in just a tap"
    />
        </Helmet>
        <div className="main_homepage_blob_image">
            <div className="main_content">
                <Header />
                <Tagline />
                
            </div>
        </div>
        </>
    )
}

export default Home;