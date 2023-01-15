import Header from "./Header";


export default function About(){
    return(
        <>
        <div className="main_homepage_blob_image">
        <div className="main_content">
        <Header />
            <div className="blog_container">
                <h1 style={{"color":"#ff5049"}} >About</h1>
                <p>Welcome to <b style={{"color":"#ff5049"}}>Ambulance Karo</b>, Pakistan's first e-ambulance service. Our mission is to provide fast and reliable medical transportation to those in need, using the latest technology to ensure the safety and comfort of our patients.</p>
                <p>Ambulance Karo was founded by Ahsan Azeemi, a dedicated and innovative developer who saw the need for an e-ambulance service in Pakistan. Ahsan has worked tirelessly to bring Ambulance Karo to life, and he is committed to continuing to improve and expand our services.</p>
                <p>We are proud to be the first app of our kind in Pakistan, and we are grateful for the opportunity to serve our community. However, we rely on donations to keep our services running. If you would like to support our mission and help us to continue providing e-ambulance services to those in need, please consider making a donation.</p>
                <p>Thank you for choosing Ambulance Karo for your medical transportation needs. We are committed to providing the highest level of care to our patients and we look forward to serving you.</p>
                






                <p><br />Regards,<br /><b>Pioneer of online ambulance service in Pakistan</b></p>
                <p>AHSAN AZEEMI (<a 
                style={{color : "#000"}} 
                href="mailto:xorahsan@gmail.com" >xorahsan@gmail.com</a>)</p>
            </div>
        
            </div></div>
        </>
    )
}