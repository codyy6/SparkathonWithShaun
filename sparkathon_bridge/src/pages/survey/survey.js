import React, { useState,useEffect } from 'react';
import NavigationBar from '../../components/topNav'
import "./survey.css"
import { BrowserProvider } from 'ethers';
import { Link } from 'react-router-dom'; // Import the Link component

function claimPoap(){
  const sdk = require('api')('@poap/v1.0#lcw4v2g2llldijtcg');

  sdk.auth('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik5qQTNOalpGUWpkRE9ESTNRa0V3UlVSRE9VVkVNRVUxT1VVd1JrSTNNRGs1TlRORVFqUTNSUSJ9.eyJpc3MiOiJodHRwczovL2F1dGguYWNjb3VudHMucG9hcC54eXovIiwic3ViIjoiVGRncGVkYXAxY0FodVNwbzJXeWQ0QnFTRlQ4RGV0WEdAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBpLnBvYXAudGVjaCIsImlhdCI6MTY5NjA0NjI5NSwiZXhwIjoxNjk2MTMyNjk1LCJhenAiOiJUZGdwZWRhcDFjQWh1U3BvMld5ZDRCcVNGVDhEZXRYRyIsInNjb3BlIjoibWludCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbIm1pbnQiXX0.jRjrQIw1PXjAKLztFvg8pHszwwNHXFuOSPHzvtfwPxpmmOxilSITvRPl_eHViSfrZpybBLO79uwXyL929iaeeU1d9jZN3Cg_tQH33-EPpKGf-Fy5obF_QTGCkmv7uENoW901EhILIyy4yt1bHxFfEm6ijhY_Xonqic8gBACGfOAWOOcqIYJG3T4d8_YL4KG2103AF5T6Y7Tr5beXIhkNXyZl6TOp7C2rjbXmf60TBAHHcX2pPBIeoRpuJ7quG4neKDk0S0haJY4RwipJY_KEyQRKrk_Tnmom0GB1wSzHCp_4UcB7AwwhVpOHZ3RWqrzMqhQTsc-zC0SY6AiOyyLRpw');
  sdk.auth('h68Y0m9sK4HfODoRrqDPprKrHHTMgmdXxbWTEt8X70TgPM8MugH7zrsbQgS2smKTMJpgUKSQF888UM9UuUX4vlG0kaGD6kiITZNw5DyS0yx8MuMo0qfSPdOFOb1K2URu');
  sdk.pOSTActionsClaimQr({
    sendEmail: false,
    secret: 'ab9fc58bbb84bfcfc903e90138f91ca3657e96667f88542d5aa96e3b46fbfa8a',
    address: '',
    qr_hash: 'wrq8qv'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
}

function Survey({ userAddress: propsUserAddress }){
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

  const [answers, setAnswers] = useState({
    question1: null,
    question2: null,
    question3: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAnswers({ ...answers, [name]: value });
  };

  return (
    <div>
    <NavigationBar />
    <div className="container">
      <div className="bigcard">
        <h1 className="header">Gnosis Survey</h1>
        <p className="paragraph">Done by: {ensName || userAddress}</p>
        <form>
        <div className="scard">
          <label>1. Is Gnosis the most Decentralized Chain?</label>
          <div>
            <input
              type="radio"
              name="question1"
              value="true"
              onChange={handleInputChange}
            />
            <label>True</label>
            <input
              type="radio"
              name="question1"
              value="false"
              onChange={handleInputChange}
            />
            <label>False</label>
          </div>
        </div>

        <div className='scard'>
          <label>2. How secure is POAP Protocol?</label>
          <div>
            <select
              name="question2"
              onChange={handleInputChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select security level
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className='scard'>
          <label>3. Describe in your own words how is Gnosis the best</label>
          <div>
            <textarea
              name="question3"
              value={answers.question3}
              onChange={handleInputChange}
              rows="4"
              cols="43"
              placeholder="Type your answer here"
              className='textarea'
            />
          </div>
        </div>
        <Link to="/complete">
          <button type="submit" className="button" onClick={claimPoap}>Submit</button>
        </Link>
        </form>
      </div>
    </div>
  </div>
  );
  }
  
export default Survey;