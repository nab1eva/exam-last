import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { EducationForm } from "../../types";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingg";

const EducationsUser = () => {
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const obj = {
    name: "",
    level: "",
    description: "",
    startDate: "",
    endDate: "",
  };

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [educations, setEducations] = useState([]);
  const [education, setEducation] = useState(obj);
 

  const { name, level, description, startDate, endDate } = education;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setEducation(obj);
    setShow(false);
    setSelected("");
  };

  const getEducations = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `education?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setEducations(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getEducations();
  }, [getEducations]);

  const editEducation = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`education/${id}`);
      const { name, level, description, startDate, endDate } = data;
      setEducation({
        name,
        level,
        endDate: endDate.split("T")[0],
        startDate: startDate.split("T")[0],
        description,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEducation = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this education?");
    if (checkDelete) {
      try {
        await request.delete(`education/${id}`);
        getEducations();
        toast.success("Delete education successfully");
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
    setEducation({ ...education, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`education/${selected}`, education);
        getEducations();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`education`, education);
        getEducations();
        toast.success("Education added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="section">
      <div className="section-top">
        <h2 className="title">Education</h2>
        <button onClick={() => setShow(!show)} className="add-button">
          Add Education
        </button>
      </div>
      {loading ? (
        <LoadingGreen />
      ) : (
        <div className="education-list">
          {educations?.map((el: EducationForm) => (
            <div key={el._id} className="education-card">
              <h3 key={el.name}>
                Name: <span>{el.name}</span>
              </h3>
              <p key={el.level}>
                Level: <span>{el.level}</span>
              </p>
              <p key={el.description}>
                Field of education: <span>{el.description}</span>
              </p>
              <div className="education-date">
                {" "}
                <p key={el.startDate}>
                  from: <span>{el.startDate.split("T")[0]}</span>
                </p>
                <p key={el.endDate}>
                  to: <span>{el.endDate.split("T")[0]}</span>
                </p>
              </div>
              <div className="ed-buttons">
                <i
                  onClick={() => editEducation(el._id + "")}
                  className="edit-button fa-solid fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteEducation(el._id + "")}
                  className="delete-button fa-solid  fa-trash-can"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {educations.length === 0 && !loading ? (
        <div>
          <Empty />
        </div>
      ) : null}
      {total > 0 ? (
        <div className="pagination">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal show={show}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Edit " : "Add "} Education
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x "></i>
        </div>
        <hr className="pb-4" />

        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Education:</label>
            <input
              className="login-input black"
              type="text"
              name="name"
              id="name"
              placeholder="Education"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="level">Level:</label>
            <input
              required
              className="login-input black"
              type="text"
              name="level"
              id="level"
              placeholder="Level"
              value={level}
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
    </section>
  );
};

export default EducationsUser;
