import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../states/userInfo";
import { IMGURL } from "../../const";

import LoadingGreen from "../../components/loadingg";
import Nav from "../../components/nav/Nav";

const HomePage = () => {
  const { getUserData, userData, loading } = useUserInfo();

  const { firstName, lastName, fields, photo } = userData;
  console.log(fields);

  const resFields = fields[0]?.split(",") || [];
  console.log(resFields);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <section className="dashboard">
      <Nav />
      <div className="user-info">
        <h1>
          <Link to="/home">
            {firstName ? firstName + " " + lastName : "FirstName"}
          </Link>
        </h1>

        <h2 className="pt-3 wrapper text-center">
          <div className="words">
            {resFields.map((el, id) => (
              <p key={id} className="wrapper-item">
                {el}
              </p>
            ))}
          </div>
        </h2>

        <img
          style={{ objectFit: "cover", objectPosition: "top" }}
          src={
            photo
              ? IMGURL + photo
              : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
          }
          className="profile"
          alt=""
        />

        {loading ? (
          <div className="fixed z-30 bg-white bg-opacity-20 backdrop-blur-md flex justify-center items-center top-0 left-0 w-screen h-screen">
            <LoadingGreen />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default HomePage;
