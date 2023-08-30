import { Link } from "react-router-dom";
import { IMGURL } from "../../const";
import { PortfolioForm } from "../../types";

const PortfolioCard = ({
  photo,
  name,
  url,
  description,
}: PortfolioForm) => {
  return (
    <div className="project-card">
      <img
        className="portfolio-photo"
        src={
          photo._id ? IMGURL + photo._id + "." + photo.name.split(".")[1] : ""
        }
        alt=""
      />
      <h2>{name}</h2>
      <p>{description}</p>
      <button className="link">
        <Link target="blank" to={url}>
          Click here
        </Link>
      </button>
    </div>
  );
};

export default PortfolioCard;
