import { useEffect } from "react";
import { EducationForm, ExperienceForm } from "../../types";
import { useResume } from "../../states/resume";
import { useAuth } from "../../states/auth";
import "./style.scss";

const ResumePage = () => {
  const { userId } = useAuth();
  const { getEducations, getExperiences, educationsData, experiencesData } =
    useResume();

  useEffect(() => {
    getEducations(userId);
    getExperiences(userId);
  }, [getExperiences, getEducations, userId]);

  return (
    <section className="container">
      <div className="resume-heading">
        <h4>Resume</h4>
        <div></div>
      </div>
      <div className="resume-grid">
        <div className="education-section">
          <h3 className="resume-section-title">Education</h3>
          <div className="resume-content education-content">
            {educationsData.map((education: EducationForm) => (
              <div key={education._id} className="resume-entry">
                <h4 className="resume-entry-title">{"_" + education.name}</h4>
                <p className="resume-date">
                  {"from: " + education.startDate.split("T")[0].split("-")[0] +
                    " to: " +
                    education.endDate.split("T")[0].split("-")[0]}
                </p>
                <p className="resume-level">{education.level}</p>
                <p className="resume-description">{education.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="experience-section">
          <h3 className="resume-section-title">Experiences</h3>
          <div className="resume-content experience-content">
            {experiencesData.map((experience: ExperienceForm) => (
              <div key={experience._id} className="resume-entry">
                <h4 className="resume-entry-title">{"_" + experience.companyName}</h4>
                <p className="resume-date">
                  {"from: " + experience.startDate.split("T")[0].split("-")[0] +
                    " to: " + 
                    experience.endDate.split("T")[0].split("-")[0]}
                </p>
                <p className="resume-company-name text-lg"> <span>at: </span>{experience.companyName}</p>
                <p className="resume-description"><span>as: </span>{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default ResumePage;
