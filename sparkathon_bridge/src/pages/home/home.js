import React, { useState, useEffect } from 'react';
import NavigationBar from '../../components/topNav';
import { Link, useNavigate } from 'react-router-dom';
import "./home.css";
import axios from 'axios';

function Main() {
  const [userAddress, setAddress] = useState("");
  const [poapExist, setPoapExist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
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
      const address = result.split(" ")[result.split(" ").length - 1];
      setAddress(address);
    } catch (error) {
      console.error(`Error in getInformation: ${error}`);
    }
  }

  const options = {
    method: 'GET',
    url: `https://api.poap.tech/actions/scan/${userAddress}/150793`,
    headers: {
      accept: 'application/json',
      'x-api-key': 'h68Y0m9sK4HfODoRrqDPprKrHHTMgmdXxbWTEt8X70TgPM8MugH7zrsbQgS2smKTMJpgUKSQF888UM9UuUX4vlG0kaGD6kiITZNw5DyS0yx8MuMo0qfSPdOFOb1K2URu'
    }
  };

  useEffect(() => {
    // Make the axios request here when the component mounts
    axios
      .request(options)
      .then(function (response) {
        setPoapExist(true);
      })
      .catch(function (error) {
        setPoapExist(false);
      });
  }, [options]);

  function isPoapExist() {
    if (poapExist === false) {
      navigate('/survey');
    } else {
      alert("Survey already done");
    }
  }

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="card">
          <div className='cardLink' onClick={isPoapExist}>
            <h3><i><u>Gnosis Survey by Gnosis Team</u></i></h3>
            <p>A Survey to understand more about users' opinion on Gnosis Chain and potential future enhancement.</p>
          </div>
        </div>
        <div className="card">
          <div className='cardLink' onClick={isPoapExist}>
            <h3><i><u>POAP Survey by POAP Team</u></i></h3>
            <p>A Survey to understand more about users' opinion on POAP and potential future enhancement.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;