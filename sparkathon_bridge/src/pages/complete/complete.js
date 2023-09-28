import React, { useState,useEffect } from 'react';
import NavigationBar from '../../components/topNav'
import { BrowserProvider } from 'ethers';
import "./complete.css"
import SurveyPOAP from "../../images/SurveyPOAP.png"

function Complete({ userAddress: propsUserAddress }) {
  const [userAddress, setAddress] = useState("");
  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    // Call getInformation when the component mounts
    getInformation();
  }, []);

  async function getInformation() {
    try {
      const res = await fetch(`http://localhost:3000/personal_information`, {
        credentials: 'include',
      });

      if (!res.ok) {
        console.error(`Failed in getInformation: ${res.statusText}`);
        return;
      }

      const result = await res.text();
      console.log(result);
      const address = result.split(" ")[result.split(" ").length - 1];
      setAddress(address);

      // Now that you have the address, you can call displayENSProfile
      displayENSProfile(address);
    } catch (error) {
      console.error(`Error in getInformation: ${error}`);
    }
  }

  async function displayENSProfile(address) {
    const provider = new BrowserProvider(window.ethereum);
    const ensName = await provider.lookupAddress(address);
    setEnsName(ensName);
  }

  return (
    <div>
      <NavigationBar />
      <h1 className="header">Thanks for Filling the Survey, here's a POAP to appreciate your efforts</h1>
      <p className="header">{ensName || userAddress}</p>
      <div className="container">
        <div className="circleimage-container">
          <a href='https://app.poap.xyz/token/6800192' target="_blank">
          <img className="circleimage" src={SurveyPOAP} alt="Survey POAP" /></a>
        </div>
        <p className="paragraph">
          Do note once you have this POAP, you cannot fill this survey again.
        </p>
      </div>
    </div>
  );  
}

export default Complete;
