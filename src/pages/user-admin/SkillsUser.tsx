import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Empty, Pagination } from "antd";
import { toast } from "react-toastify";
import { SkillForm } from "../../types";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingg";

const SkillsUser = () => {
  const { userId } = useAuth();

  const obj = {
    name: "",
    percent: "",
  };
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [skills, setSkills] = useState([]);
  const [skill, setSkill] = useState(obj);

  const { name, percent } = skill;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setSkill(obj);
    setShow(false);
    setSelected("");
  };

  const getSkills = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `skills?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setSkills(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  const editSkill = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`skills/${id}`);
      const { name, percent } = data;
      setSkill({
        name,
        percent,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSkill = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this Skill?");
    if (checkDelete) {
      try {
        await request.delete(`skills/${id}`);
        getSkills();
        toast.success("Delete skill successfully");
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
    setSkill({ ...skill, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selected) {
      try {
        await request.put(`skills/${selected}`, skill);
        getSkills();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`skills`, skill);
        getSkills();
        toast.success("Skill added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  return (
    <section className="section">
      <div className="section-top">
        <h2 className="title">Skills</h2>
        <button onClick={() => setShow(!show)} className="add-button">
          Add Skill
        </button>
      </div>
      {loading ? (
        <LoadingGreen />
      ) : (
        <div className="skills-list">
          {skills?.map((item: SkillForm) => (
            <div key={item._id} className="skill-card">
              <h3 key={item.name}>{item.name}</h3>
              <p key={item.percent}>
                Awareness percentage: <br />
                <span>{item.percent}%</span>
              </p>
              <div className="ed-buttons">
                <i
                  onClick={() => editSkill(item._id + "")}
                  className="edit-button fa-solid fa-pen-to-square"
                ></i>
                <i
                  onClick={() => deleteSkill(item._id + "")}
                  className="delete-button fa-solid fa-trash-can"
                ></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {skills.length === 0 && !loading ? (
        <div>
          <Empty />
        </div>
      ) : null}
      {total > PAGELIMIT ? (
        <div className="pagination">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      <Modal show={show} >
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Edit " : "Add "} Skill
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x"></i>
        </div>
        <hr className="pb-4" />
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Texnology name:</label>
            <input
              className="login-input"
              type="text"
              name="name"
              id="name"
              placeholder="Texnology name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="percent">Percent:</label>
            <input
              required
              className="login-input"
              type="text"
              name="percent"
              id="percent"
              placeholder="Percent"
              value={percent}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <button className="add-button">
              {selected ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default SkillsUser;
