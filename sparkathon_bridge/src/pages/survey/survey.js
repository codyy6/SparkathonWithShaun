import React, { useState,useEffect } from 'react';
import NavigationBar from '../../components/topNav'
import "./survey.css"
import { BrowserProvider } from 'ethers';
import { Link } from 'react-router-dom'; // Import the Link component

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
        <button type="submit" className="button">Submit</button>
        </Link>
        </form>
      </div>
    </div>
  </div>
  );
  }
  
export default Survey;