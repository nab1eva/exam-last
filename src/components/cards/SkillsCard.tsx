import { skillType } from "../../types";

const SkillsCard = ({ name, percent }: skillType) => {
  return (
    <div className="skill-card">
      <h3 key={name}>{name}</h3>
      <p key={percent}>
        Awareness percentage: <br />
        <span>{percent}%</span>
      </p>
    </div>
  );
};
export default SkillsCard;
