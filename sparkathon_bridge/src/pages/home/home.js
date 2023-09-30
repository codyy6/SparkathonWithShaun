import NavigationBar from '../../components/topNav'
import React from 'react'; // Import useState and useEffect
import { Link } from 'react-router-dom'; // Import the Link component
import "./home.css";

function Main() {

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
