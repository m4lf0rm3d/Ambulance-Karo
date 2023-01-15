import './App.css';
import { Routes,Route, useNavigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Contact from './components/Contact';
import UserDashboard from './components/UserDashboard/UserDashboard';
import DriverDashboard from './components/DriverDashboard/DriverDashboard';
import SudoDashboard from './components/SudoDashboard/SudoDashboard';
import url from './components/ServerUrl';

function App () {
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
     if(response.status !== 200 && window.location.pathname.search('/dashboard') !== -1){
      localStorage.clear()
      return redirect("/")
     }
     const temp = await response.json()
     setData(temp.rule)
  }

  useEffect(()=>{
    verifyJWT()
  },[])

  return (
    <Suspense fallback={<div>Redirecting...</div>} >
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      {/* <Route path='/dashboard' element={<MainDashboard />} /> */}
      {
        data === 'user' ? <Route path='/dashboard' element={<UserDashboard />} />
        : <></>
      }
      {
        data === 'driver' ? <Route path='/dashboard' element={<DriverDashboard />} />
        : <></>
      }
      {
        data === 'sudo' ? <Route path='/dashboard' element={<SudoDashboard />} />
        : <></>
      }
      
      <Route path='/about/' element={<About />} />
      <Route path='/contact/' element={<Contact />} />

    </Routes>
    </Suspense>
  );
}

export default App;
