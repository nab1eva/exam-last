import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./aside.scss"; // Import the SCSS file

const AsideUser = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { pathname } = useLocation();

  return (
    <aside className={`aside-container ${show ? "expanded" : "collapsed"}`}>
      <div className="aside-content">
        <h2 className="aside-title">
          <NavLink
            className={`aside-link ${pathname === "/account" ? "active" : ""}`}
            to="/account"
          >
            <i className="fa-regular fa-user"></i>
            Account
          </NavLink>
        </h2>
        <ul className="aside-links">
          <li>
            <NavLink
              className={`aside-link ${
                pathname === "/user-experiences" ? "active" : ""
              }`}
              to="/user-experiences"
            >
              <i className="bi bi-graph-up-arrow"></i> Experiences
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`aside-link ${
                pathname === "/user-skills" ? "active" : ""
              }`}
              to="/user-skills"
            >
              <i className="bi bi-card-checklist"></i> Skills
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`aside-link ${
                pathname === "/user-educations" ? "active" : ""
              }`}
              to="/user-educations"
            >
              <i className="bi bi-mortarboard-fill"></i> Education
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`aside-link ${
                pathname === "/user-projects" ? "active" : ""
              }`}
              to="/user-projects"
            >
              <i className="bi bi-briefcase-fill"></i> Projects
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="aside-toggle">
        <i onClick={() => setShow(!show)} className="fa-solid toggle-icon"></i>
      </div>
    </aside>
  );
};

export default AsideUser;
