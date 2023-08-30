import Modal from "../../components/modal";
import { useCallback, useEffect, useState } from "react";
import { IMGURL, PAGELIMIT } from "../../const";
import { request } from "../../server/request";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import { PortfolioForm } from "../../types";
import { Link } from "react-router-dom";
import { useAuth } from "../../states/auth";
import LoadingGreen from "../../components/loadingg";

const PortfoliosUser = () => {
  const { userId } = useAuth();
  const obj = {
    name: "",
    description: "",
    photo: { name: "", _id: "" },
    url: "",
  };

  const [selected, setSelected] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [portfolios, setPortfolios] = useState([]);
  const [portfolio, setPortfolio] = useState(obj);
  const [img, setImg] = useState({ name: "", _id: "" });

  const { name, url, description } = portfolio;

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setPortfolio(obj);
    setShow(false);
    setSelected("");
  };

  const getPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await request(
        `portfolios?user=${userId}&page=${page}&limit=${PAGELIMIT}`
      );
      setTotal(data.pagination.total);
      setPortfolios(data.data);
    } finally {
      setLoading(false);
    }
  }, [page, userId]);

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]);

  const editPortfolio = async (id: string) => {
    setSelected(id);
    try {
      const { data } = await request(`portfolios/${id}`);
      const { name, url, photo, description } = data;
      setPortfolio({
        name,
        url,
        description,
        photo,
      });
      openModal();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePortfolio = async (id: string) => {
    const checkDelete = confirm("Do you want to delete this portfolio?");
    if (checkDelete) {
      try {
        await request.delete(`portfolios/${id}`);
        getPortfolios();
        toast.success("Delete portfolio successfully!");
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
    setPortfolio({ ...portfolio, [name]: value });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selected) {
      try {
        await request.put(`portfolios/${selected}`, {
          ...portfolio,
          photo: img._id,
        });
        getPortfolios();
        toast.success("Changed successfully");
      } catch {
        toast.error("Error");
      }
    } else {
      try {
        await request.post(`portfolios`, { ...portfolio, photo: img._id });
        getPortfolios();
        toast.success("Experience added");
      } catch (err) {
        console.log(err);
      }
    }
    closeModal();
  };

  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.files?.[0];
    const form = new FormData();
    result && form.append("file", result);
    try {
      const { data } = await request.post("upload", form);
      setImg(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="section">
      <div className="section-top">
        <h2 className="title">Projects</h2>
        <button onClick={() => setShow(!show)} className="add-button">
          Add Project
        </button>
      </div>
      <div
        style={{ height: "calc(100vh - 210px)" }}
        className="overflow-y-scroll mt-2 "
      >
        {loading ? (
          <LoadingGreen />
        ) : (
          <div className="projects-list">
            {portfolios?.map((el: PortfolioForm) => (
              <div key={el._id} className="project-card">
                <img
                  className="portfolio-photo"
                  src={
                    el.photo._id
                      ? IMGURL +
                        el.photo._id +
                        "." +
                        el.photo.name.split(".")[1]
                      : ""
                  }
                  alt=""
                />
                <h2>{el.name}</h2>
                <p>{el.description}</p>
                <button className="link">
                  <Link target="blank" to={el.url}>
                    Click here
                  </Link>
                </button>
                <div className="ed-buttons">
                  <i
                    onClick={() => editPortfolio(el._id + "")}
                    className="edit-button fa-solid fa-pen-to-square"
                  ></i>
                  <i
                    onClick={() => deletePortfolio(el._id + "")}
                    className="delete-button fa-solid fa-trash-can"
                  ></i>
                </div>
              </div>
            ))}
          </div>
        )}
         {total > 0 ? (
        <div className="pagination">
          <Pagination current={page} onChange={onChange} total={total} />
        </div>
      ) : null}
      </div>
      <Modal show={show}>
        <div className="flex justify-between items-center pb-3">
          <h2 className="text-xl font-semibold">
            {selected ? "Editing " : "Adding "} Portfolio
          </h2>
          <i onClick={closeModal} className="fa-solid fa-x"></i>
        </div>
        <hr className="pb-4" />
        <div className="mb-2">
          <img
            className="w-[200px] mb-2"
            src={img._id ? IMGURL + img._id + "." + img.name.split(".")[1] : ""}
            alt="portfolio"
          />
          <input type="file" onChange={changeImg} />
        </div>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Site Name:</label>
            <input
              className="login-input black"
              type="text"
              name="name"
              id="name"
              placeholder="Site Name"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input
              required
              className="login-input black"
              type="text"
              name="url"
              id="url"
              placeholder="Url"
              value={url}
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

export default PortfoliosUser;
