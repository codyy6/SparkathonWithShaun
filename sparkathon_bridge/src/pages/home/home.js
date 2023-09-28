import NavigationBar from '../../components/topNav'
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserProvider } from 'ethers';
import { Link } from 'react-router-dom'; // Import the Link component
import "./home.css";

function Main() {
  const [address, setAddress] = useState("");
  const [ensName, setEnsName] = useState(""); // State to hold the ENS name

  useEffect(() => {
    // Perform this effect when the component mounts

    getInformation();
}, []);

async function getInformation() {

  
    const res = await fetch(`http://localhost:3000/personal_information`, {
        credentials: 'include',
    });

    if (!res.ok) {
        console.error(`Failed in getInformation: ${res.statusText}`);
        return;
    }

    let result = await res.text();
    console.log(result);
    const address = result.split(" ")[result.split(" ").length - 1];
    setAddress(address)

    // Now that you have the address, you can call displayENSProfile
    displayENSProfile(address);    
}

async function displayENSProfile(address) {
  const provider = new BrowserProvider(window.ethereum);
  const ensName = await provider.lookupAddress(address);
  setEnsName(ensName); // Update the state with the ENS name
}
return ( 
  <div>
    <NavigationBar />
    <div className="container">
      <div className="card">
        <Link to="/survey" className='cardLink'>
          <h3><i><u>Gnosis Survey by Gnosis Team</u></i></h3>
          <p>A Survey to understand more about users' opinion on Gnosis Chain and potential future enhancement.</p>
        </Link>
        </div>
      <div className="card">
      <Link to="/survey" className='cardLink'>
        <h3><i><u>POAP Survey by POAP Team</u></i></h3>
        <p>A Survey to understand more about users' opinion on Gnosis Chain and potential future enhancement.</p>
      </Link>
      </div>
    </div>
  </div>
);
}

export default Main;
