import React from 'react';
import { Link } from 'react-router-dom';
import './topNav.css';

function TopNav() {
  return (
    <div className="center-items">
      <Link to="/swapping" className="custom-link">
        Swapping
      </Link>
      <Link to="/bridging" className="custom-link">
        Bridging
      </Link>
    </div>
  );
}

export default TopNav;
