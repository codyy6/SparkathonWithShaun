import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './topNav.css';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for controlling dropdown visibility
  const navigate = useNavigate();

  async function SignInWithEthereum() {
    const signer = await provider.getSigner();
    const address = await signer.getAddress(); // Use a different variable name to avoid conflicts
    const message = await createSiweMessage(
      address,
      'Sign in with Ethereum to the app.'
    );
    try {
      const signature = await signer.signMessage(message);
      const res = await fetch(`${BACKEND_ADDR}/verify`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
        credentials: 'include'
      });

      if (!res.ok) {
        console.error(`Failed in getInformation:`);
      } else {
        navigate('/myjournal');
      }
      console.log(await res.text());
    } catch (error) {
      console.error('Signature request was rejected or failed:', error);
    }

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
      const userAddress = result.split(" ")[result.split(" ").length - 1];
      setUserAddress(userAddress);
    }

    getInformation();
  }

  function handleItemClick(userAddress) {
    if (userAddress) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      SignInWithEthereum();
    }
  }

  function WelcomeBack({ userAddress, onClick }) {
    return (
      <div className="end-item">
        <p onClick={onClick}>
          {userAddress ? `Welcome back, ${userAddress}` : `Connect to Wallet`}
        </p>
      </div>
    );
  }

  function DropdownMenu() {
  return (
    <div className='dropdown-wrap'>
      <ul>
        <Link to="/userprofile" className="dropdown-content">
          <p> Profile </p>
        </Link>
        <Link to="/" className="dropdown-content">
          <p> Sign Out </p>
        </Link>
      </ul>
    </div>
  );
}

  return (
    <div className='wrap'>
      <div className="links">
      <Link to="/swapping" className="custom-link">
        Swapping
      </Link>
      <Link to="/bridging" className="custom-link">
        Bridging
      </Link>
      </div>
    <div>

      <WelcomeBack userAddress={userAddress} onClick={() => handleItemClick(userAddress)} />

      {isDropdownOpen && <DropdownMenu />}
      </div>
      
    </div>
  );
}

export default TopNav;
