import "./home.css";
import NavigationBar from '../components/topNav.js'
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserProvider } from 'ethers';


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
  console.log(ensName);
  setEnsName(ensName); // Update the state with the ENS name
}


    return ( 
      <div>
        <NavigationBar />
        <div>
          <p>Testing</p>
        </div>
      </div>
    );
}

export default Main;
