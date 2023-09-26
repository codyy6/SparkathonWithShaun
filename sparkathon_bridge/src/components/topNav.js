import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './topNav.css';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import SurvowlHori from "../images/SurvOwlHori.png"


const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

const BACKEND_ADDR = "http://localhost:3000";

async function createSiweMessage(address, statement) {
  const res = await fetch(`${BACKEND_ADDR}/nonce`, {
    credentials: 'include',
  });
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1',
    nonce: await res.text()
  });
  return message.prepareMessage();
}




function TopNav() {
  const [userAddress, setUserAddress] = useState(""); // Rename to userAddress
  const [ensName, setEnsName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for controlling dropdown visibility
  
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
    setUserAddress(address)

    // Now that you have the address, you can call displayENSProfile
    displayENSProfile(address);
    
}

async function displayENSProfile(address) {
  const provider = new BrowserProvider(window.ethereum);
  const ensName = await provider.lookupAddress(address);
  console.log(ensName);
  setEnsName(ensName); // Update the state with the ENS name
}

  function WelcomeBack({ userAddress, onClick }) {
    return (
      <div className="end-item">
        <p onClick={onClick}>
          {ensName ? `Welcome back, ${ensName}` : `Welcome back, ${userAddress}`}
        </p>
      </div>
    );
  }

  function DropdownMenu() {
  return (
    <div className='dropdown'>
      <div className='dropdown-wrap'>
        <Link to="/userprofile" className="dropdown-content">
          <p> Profile </p>
        </Link>
      </div>
      <div className='dropdown-wrap'>
        <Link to="/" className="dropdown-content">
          <p> Sign Out </p>
        </Link>
      </div>
    </div>
  );
}

  return (
    <div className='wrap'>
      <div className="links">
        <Link to="/home">
          <img src={SurvowlHori} className='logo'></img>
        </Link>
      </div>

      <div className='wallet'>
        <WelcomeBack userAddress={userAddress} onClick={() =>setIsDropdownOpen(!isDropdownOpen)} />
        {isDropdownOpen && <DropdownMenu />}
      </div>
      
    </div>
  );
}

export default TopNav;
