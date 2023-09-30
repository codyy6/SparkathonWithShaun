import React, { useState,useEffect } from 'react';
import NavigationBar from '../../components/topNav'
import { BrowserProvider } from 'ethers';
import "./complete.css"
import SurveyPOAP from "../../images/SurveyPOAP.png"
import axios from 'axios';

function Complete({ userAddress: propsUserAddress }) {
  const [userAddress, setAddress] = useState("");
  const [ensName, setEnsName] = useState("");

  useEffect(() => {
    // Call getInformation when the component mounts
    getInformation();
  }, []);
  const options = {
    method: 'POST',
    url: 'https://api.poap.tech/actions/claim-qr',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qQTNOalpGUWpkRE9ESTNRa0V3UlVSRE9VVkVNRVUxT1VVd1JrSTNNRGs1TlRORVFqUTNSUSJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWNjb3VudHMucG9hcC54eXovIiwic3ViIjoiVGRncGVkYXAxY0FodVNwbzJXeWQ0QnFTRlQ4RGV0WEdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnBvYXAudGVjaCIsImlhdCI6MTY5NjA0NjI5NSwiZXhwIjoxNjk2MTMyNjk1LCJhenAiOiJUZGdwZWRhcDFjQWh1U3BvMld5ZDRCcVNGVDhEZXRYRyIsInNjb3BlIjoibWludCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbIm1pbnQiXX0.jRjrQIw1PXjAKLztFvg8pHszwwNHXFuOSPHzvtfwPxpmmOxilSITvRPl_eHViSfrZpybBLO79uwXyL929iaeeU1d9jZN3Cg_tQH33-EPpKGf-Fy5obF_QTGCkmv7uENoW901EhILIyy4yt1bHxFfEm6ijhY_Xonqic8gBACGfOAWOOcqIYJG3T4d8_YL4KG2103AF5T6Y7Tr5beXIhkNXyZl6TOp7C2rjbXmf60TBAHHcX2pPBIeoRpuJ7quG4neKDk0S0haJY4RwipJY_KEyQRKrk_Tnmom0GB1wSzHCp_4UcB7AwwhVpOHZ3RWqrzMqhQTsc-zC0SY6AiOyyLRpw',
      'x-api-key': 'h68Y0m9sK4HfODoRrqDPprKrHHTMgmdXxbWTEt8X70TgPM8MugH7zrsbQgS2smKTMJpgUKSQF888UM9UuUX4vlG0kaGD6kiITZNw5DyS0yx8MuMo0qfSPdOFOb1K2URu'
    },
    data: {
      sendEmail: false,
      address: userAddress,
      qr_hash: 'wrq8qv',
      secret: 'ab9fc58bbb84bfcfc903e90138f91ca3657e96667f88542d5aa96e3b46fbfa8a'
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

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
        <a href={`https://app.poap.xyz/scan/${userAddress}`} target="_blank">
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
