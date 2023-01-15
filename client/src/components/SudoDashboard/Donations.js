import { useEffect, useState } from "react";
import url from "../ServerUrl";

const Donations = () => {

    const [donations, setDonations] = useState([])

    const loadDonations = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }
        let bodyContent = JSON.stringify({
            "query": `getDonationsData`
        });
        
        let response = await fetch(`${url}/resolveQuery`, { 
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        let data = await response.json();
        setDonations(data)
        
    }
    useEffect(()=>{
        loadDonations()
    },[])


    return(
        <div className="admin_ambulances">
            <h1>Donations</h1>
            <p style={{marginLeft: "20px",color: "#ff5049"}} ><b>Current Donations ({donations.length})</b></p>


            <table className="history_table">
                <tr className="history_table_header">
                    <th>Donation ID</th>
                    <th>Donor ID</th>
                    <th>Donor Email</th>
                    <th>Donor Contact</th>
                    <th>Time</th>
                    <th>Donor Amount</th>

                </tr>
                {donations.map(item => {
                    return <tr>
                        <td>{item.donationid}</td>
                        <td>{item.donorid}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>{item.donatedon}</td>
                        <td>{item.donatedamount}</td>
                    </tr>
                })}

            </table>
        </div>
    )
}
export default Donations;