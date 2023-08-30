import { Link } from "react-router-dom";
import { useState } from "react";
import "./nav.scss";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
   
      
        <div className="header">
          <div className="header-menu ">
            <Link to="/about">About me</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/portfolios">My Works</Link>
            <Link to="/contact">Contact Me</Link>
          </div>
          <div className="dropdown">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
            <i className="fa-solid fa-bars"></i>
            </button>
            {isOpen && (
              <ul className="dropdown-menuu">
                <Link to="/about">About me</Link>
                <Link to="/resume">Resume</Link>
                <Link to="/portfolios">My Works</Link>
                <Link to="/contact">Contact Me</Link>
              </ul>
            )}
          </div>
        </div>

  );
}

export default Nav;
