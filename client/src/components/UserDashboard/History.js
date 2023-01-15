import { useEffect, useState } from "react";
import url from "../ServerUrl";

const History = () => {

    const [history, setHistory] = useState([])

    const getHistory = async() => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json",
            "token": localStorage.token
        }

        let response = await fetch(`${url}/history`, { 
            method: "POST",
            headers: headersList
        });
        let data = await response.json();
        data = data.reverse()
        setHistory(data)
    }
    useEffect(()=>{
        getHistory()
    },[])
        

    return(
        <div id="ambulance_call" className="signup_container" style={{border: "none"}} >
            <h1>History</h1>
            <table className="history_table">
                <tr className="history_table_header">
                    <th>ID</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Status</th>

                </tr>
                {history.map((r)=>{
                    return <tr>
                        <td>{r.requestid}</td>
                        <td><a target="_blank" href={`https://www.google.com/maps/search/${r.location}`}>Open Maps</a></td>
                        <td>{r.time}</td>
                        {r.status === "Active" ? <td  className="active">{r.status}</td> : ""}
                        {r.status === "Completed" ? <td  className="fulfilled">{r.status}</td> : ""}
                        {r.status === "Canceled" ? <td  className="canceled">{r.status}</td> : ""}
                    </tr>
                })}
                
            </table>
        </div>
    )
}
export default History;