import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { SiweMessage } from 'siwe';
import Logo from "../../images/survowlLogo.png";
import gnosisLogo from "../../images/gnosisLogo.png";
import "./landing.css";

const domain = window.location.host;
const origin = window.location.origin;
const provider = new BrowserProvider(window.ethereum);

let address;

const BACKEND_ADDR = "http://localhost:3000";

const networks = {
  gnosis: {
    chainId: `0x${Number(100).toString(16)}`,
    chainName: "Gnosis Mainnet",
    nativeCurrency: {
      name: "xDai",
      symbol: "XDAI",
      decimals: 18
    },
    rpcUrls: ["https://rpc.ankr.com/gnosis"],
    blockExplorerUrls: ["https://gnosisscan.io/"]
  }
}

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

const changeNetwork = async ({ networkName, setError }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName]
        }
      ]
    });
  } catch (err) {
    setError(err.message);
  }
};

const networkChanged = (chainId) => {
  console.log({ chainId });
};

function Main() {
  const [error, setError] = useState();
  const [networkSwitched, setNetworkSwitched] = useState(false); // Add a state variable to track network switch

  useEffect(() => {
    // Perform this effect when the component mounts
    window.ethereum.on("chainChanged", networkChanged);
    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  const handleNetworkSwitch = async (networkName) => {
    setError();
    try {
      await changeNetwork({ networkName, setError });
      setNetworkSwitched(true); // Set the state to indicate successful network switch
      connectToWallet();
    } catch (err) {
      console.error('Network switch failed:', err);
      setNetworkSwitched(false); // Set the state to indicate network switch failure
    }
  };

  const navigate = useNavigate(); // Access the useNavigate hook within the component

  async function connectToWallet() {
    if (!networkSwitched) {
      console.error('Network switch was not successful. Aborting connectToWallet.');
      return;
    }
    const signer = await provider.getSigner();

    address = await signer.getAddress()
    const message = await createSiweMessage(
      address,
      'Sign in with Gnosis to the app.'
    );

    try {
      const signature = await signer.signMessage(message);

      // Handle the successful signature
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
        // Handle the error response from the server
      } else {
        navigate('/home') // Use the navigate function for redirection
      }
      console.log(await res.text());
    } catch (error) {
      console.error('Signature request was rejected or failed:', error);
    }
  }

  async function metamask(){
    handleNetworkSwitch("gnosis");
  }
  return (
    <div className='container'>
      <div className='center'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='center'>
        <p onClick={metamask} className='connect'>
          Connect Wallet
        </p>
        <img src={gnosisLogo} alt='Gnosis Logo' className='gnosis' />
      </div>
    </div>
  );
}

export default Main;