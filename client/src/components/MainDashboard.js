
import url from "./ServerUrl"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import UserDashboard from "./UserDashboard/UserDashboard"

const MainDashboard = () => {

    const redirect = useNavigate()
    const [data, setData] = useState({})
    const verifyJWT = async() => {
      const headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "token": localStorage.token
       }
       
       let response = await fetch(`${url}/self`, { 
         method: "POST",
         headers: headersList
       });
       if(response.status !== 200){
        localStorage.clear()
        return redirect("/")
       }
       const temp = await response.json()
       setData(temp.rule)
    }
  
    useEffect(()=>{
        setTimeout(() => {
            verifyJWT()
        }, 2000);
    },[])

    return <>
    
    {/* {!data ? <h1>Loading...</h1> : <UserDashboard />} */}
    {!data ? <h1>Loading...</h1> : <h1>Welcome</h1>}

    
    </>
}
export default MainDashboard;