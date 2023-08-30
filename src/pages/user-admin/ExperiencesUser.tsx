import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { ExperienceForm } from "../../types";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingg";

const ExperiencesUser = () => {
  const { userId } = useAuth();
  const obj = {
    workName: "",
    companyName: "",
    description: "",
    startDate: "",
    endDate: "",
  };
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [experiences, setExperiences] = useState([]);
  const [experience, setExperience] = useState(obj);

  const { workName, companyName, description, startDate, endDate } = experience;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setExperience(obj);
    setShow(false);
    setSelected("");
  };

  const getExperiences = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `experiences?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setExperiences(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getExperiences();
  }, [getExperiences]);

  const editExperience = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`experiences/${id}`);
      const { companyName, description, workName, startDate, endDate } = data;
      setExperience({
        companyName,
        workName,
        endDate: endDate.split("T")[0],
        startDate: startDate.split("T")[0],
        description,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExperience = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this experience?");
    if (checkDelete) {
      try {
        await request.delete(`experiences/${id}`);
        getExperiences();
        toast.success("Delete experience successfully");
      } catch {
        toast.error("An error occurred, please try again");
      }
    }
  };

  const onChange = (change: number) => {
    setPage(change);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  const valuesModal = {
    selected,
    title: "Experinces",
    show,
    openModal,
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`experiences/${selected}`, experience);
        getExperiences();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`experiences`, experience);
        getExperiences();
        toast.success("Experience added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="section">
      <div className="section-top">
        <h2 className="title">Experiences</h2>
        <button onClick={() => setShow(!show)} className="add-button">
          Add Experience
        </button>
      </div>
      {loading ? (
        <LoadingGreen />
      ) : (
        <div className="education-list mt-4">
          {experiences?.map((el: ExperienceForm) => (
            <div key={el._id} className="education-card experience-card ">
              {" "}
              <h3 key={el.workName}>
                Worked as: <span>{el.workName}</span>
              </h3>
              <p key={el.companyName}>
                Company name: <span>{el.companyName}</span>
              </p>
              <p key={el.description}>
                Description: <span>{el.description}</span>
              </p>
              <div className="education-date">
              <p key={el.startDate}>
                from: <span>{el.startDate.split("T")[0]}</span>
              </p>
              <p key={el.endDate}>
                to: <span>{el.endDate.split("T")[0]}</span>
              </p>
              </div>
              <div className="ed-buttons">
                <i
                  onClick={() => editExperience(el._id + "")}
                  className="edit-button fa-solid fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteExperience(el._id + "")}
                  className="delete-button fa-solid fa-trash-can"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {experiences.length === 0 && !loading ? (
        <div>
          <Empty />
        </div>
      ) : null}
      {total > PAGELIMIT ? (
        <div className="pagination">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal {...valuesModal}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Edit " : "Add "} Experience
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x"></i>
        </div>
        <hr className="pb-4" />
        <form onSubmit={submit}>
          <div>
            <label htmlFor="companyName">Company Name:</label>
            <input
              className="login-input black"
              type="text"
              name="companyName"
              id="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="workName">Work Name:</label>
            <input
              required
              className="login-input black"
              type="text"
              name="workName"
              id="workName"
              placeholder="Work Name"
              value={workName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <input
              className="login-input black"
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="login-input black"
              type="date"
              name="startDate"
              id="startDate"
              placeholder="StartDate"
              value={startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              className="login-input black"
              type="date"
              name="endDate"
              id="endDate"
              placeholder="EndDate"
              value={endDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button className="add-button">{selected ? "Save" : "Add"}</button>
          </div>
        </form>
      </Modal>
      <div className=""></div>
    </section>
  );
};

export default ExperiencesUser;
