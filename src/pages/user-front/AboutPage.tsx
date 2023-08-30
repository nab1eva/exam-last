import  { useEffect } from "react";
import { skillType } from "../../types";
import { Link } from "react-router-dom";
import { useSkills } from "../../states/skills";
import SkillsCard from "../../components/cards/SkillsCard";
import { IMGURL } from "../../const";
import LoadingFront from "../../components/loading/LoadingFront";
import { useUserInfo } from "../../states/userInfo";
import { useAuth } from "../../states/auth";
import "./style.scss";

const AboutPage = () => {
  const { getSkills, skillsData, loading } = useSkills();
  const { getUserData, userData } = useUserInfo();
  const { userId } = useAuth();

  useEffect(() => {
    getSkills(userId);
    getUserData();
  }, [getSkills, userId, getUserData]);

  const { fields, birthday, phoneNumber, email, address, info, photo } =
    userData;

  const getDate = (date: string) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const [year, monthIndex, day] = date.split("T")[0].split("-");
    return `${day} ${month[+monthIndex - 1]} ${year}`;
  };

  const getAge = (date: string) => {
    const nowYear = new Date().getFullYear();
    const birthYear = +date.split("T")[0].split("-")[0];
    return nowYear - birthYear;
  };

  return (
    <div className="container mb-4">
      <div className="about-section">
        <img className="about-image" src={IMGURL + photo} alt="" />
        <div className="about-details">
          <h3 className="about-name">{fields.join(" & ")}</h3>
          <p className="about-description">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio
            molestiae nobis, explicabo temporibus totam dolor!
          </p>
          <ul className="about-list">
            <li className="about-list-item">
              <span className="about-list-title">Birthday: </span>
              {" " + getDate(birthday)}
            </li>
            <li className="about-list-item">
              <span className="about-list-title">Phone: </span>
              {phoneNumber}
            </li>
            <li className="about-list-item">
              <span className="about-list-title">Address: </span>
              {address}
            </li>
            <li className="about-list-item">
              <span className="about-list-title">Birthday: </span>
              {getAge(birthday)}
            </li>
            <li className="about-list-item">
              <span className="about-list-title">Degree: </span>
              Junior
            </li>
            <li className="about-list-item">
              <span className="about-list-title">Email: </span>
              <Link to={`mailto:${email}`}>{email}</Link>
            </li>{" "}
            <li className="about-list-item">
              <span className="about-list-title">Freelance: </span>
              Avialable
            </li>{" "}
          </ul>
          <p className="about-info">{info}</p>
        </div>
      </div>
      <div className="about-skills-heading">
        <h4>SKILLS</h4>
        <div></div>
      </div>
      <div className="about-skills-section">
        {skillsData?.map((skill: skillType) => (
          <SkillsCard {...skill} />
        ))}
      </div>
      {loading && (
        <div className="about-loading-overlay">
          <LoadingFront />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
