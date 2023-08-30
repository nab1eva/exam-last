import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../states/auth";
import { request } from "../../server/request";
import { userObj } from "../../types";
import { IMGURL } from "../../const";
import { toast } from "react-toastify";
import "./header.scss"; // Import the SCSS file

const HeaderUser = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [controlDropdown, setControlDropdown] = useState(false);
  const [meInfo, setMeInfo] = useState(userObj);

  const { firstName, lastName, photo } = meInfo;

  const getMeInfo = async () => {
    try {
      const { data } = await request("auth/me");
      setMeInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMeInfo();
  }, []);

  const openInfo = () => {
    setControlDropdown(!controlDropdown);
  };

  const logOutUser = () => {
    const checkLogout = window.confirm("Do you want to log out?");
    if (checkLogout) {
      logOut(navigate);
    }
    setControlDropdown(false);
  };

  const portfolioGo = () => {
    if (firstName) {
      navigate("/home");
    } else {
      toast.error("Server is not working!");
      toast.warning("Please try again!");
    }
  };

  return (
    <div className="container">
      <nav className={`header-user ${show ? "expanded" : "collapsed"}`}>
        <div className="nav-name">
          <i
            onClick={() => setShow(!show)}
            className="fa-solid fa-bars text-lg cursor-pointer"
          ></i>
          <h2 onClick={portfolioGo} className="hide-on-mobile">
            {firstName ? firstName + " " + lastName : "Your Name"}
          </h2>
        </div>
        <div className="relative flex items-center gap-2">
          <img
            style={{ objectFit: "cover", objectPosition: "top" }}
            src={
              photo
                ? IMGURL + photo
                : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
            }
            className="profile-image cursor-pointer"
            onClick={openInfo}
            alt=""
          />
          {controlDropdown ? (
            <ul className="dropdown-menu">
              <li onClick={() => navigate("/home")} className="dropdown-item">
                <i className="fa-regular fa-user"></i> View Portfolio
              </li>
              <li onClick={logOutUser} className="dropdown-item">
                <i className="bi bi-box-arrow-right"></i> Log Out
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default HeaderUser;
