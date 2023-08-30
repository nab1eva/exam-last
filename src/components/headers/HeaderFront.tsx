import { useEffect } from "react";
import Nav from "../nav/Nav";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../states/userInfo";
import "./headerFront.scss";

const HeaderFront = () => {

  const { getUserData, userData } = useUserInfo();

  const { firstName, lastName } = userData;

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <nav className="header-front">
      <div className="header-content">
        <h2 className="header-title">
          <Link to="/home">
            {firstName
              ? firstName + " " + lastName
              : "First Name"}
          </Link>
        </h2>
        <Nav/>
        
      </div>
    </nav>
  );
};

export default HeaderFront;
