import { Tabs } from "antd";
import type { TabsProps } from "antd";
import React, { useState, useEffect, Fragment } from "react";
import { IMGURL } from "../../const";
import { request } from "../../server/request";
import { toast } from "react-toastify";
import { userObj } from "../../types";
import LoadingGreen from "../../components/loadingg";
import "./account.scss";

const items: TabsProps["items"] = [
  {
    key: "account",
    label: <IconAccount />,
    children: <EditAccount />,
  },
  {
    key: "password",
    label: <IconSecurity />,
    children: <EditPassword />,
  },
];

const AccountPage = () => {
  return (
    <div
      style={{ height: "calc(100vh - 80px)" }}
      className="account-page bg-white rounded-md px-3"
    >
      <Tabs defaultActiveKey="account" items={items} />
    </div>
  );
};

export default AccountPage;

function EditAccount() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState({ ...userObj, fields: "" });
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await request(`auth/me`);
      setUser({
        ...res.data,
        fields: res.data.fields.join(),
        birthday: res.data.birthday.split("T")[0],
      });
      setImg(res.data.photo);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const {
    firstName,
    lastName,
    username,
    fields,
    info,
    phoneNumber,
    birthday,
    address,
    email,
    github,
    linkedin,
    telegram,
    instagram,
    youtube,
  } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  const changeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.files?.[0];
    const form = new FormData();
    result && form.append("file", result);
    try {
      const { data } = await request.post("auth/upload", form);
      setImg(data);
    } catch (err) {
      console.log(err);
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatedetails", { ...user, photo: img });
      toast.success("Update Account");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="overflow-y-scroll"
    >
      {loading ? (
        <LoadingGreen />
      ) : (
        <Fragment>
          <div className="mx-auto w-[200px]">
            <img
              className="w-[200px] h-[200px] object-center object-cover rounded-full mb-2"
              src={
                img
                  ? IMGURL + img
                  : "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
              }
              alt=""
            />
            <input type="file" onChange={changeImg} />
          </div>

          <form onSubmit={submit} className="formm md:grid-cols-2">
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="FirstName"
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="LastName"
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="fields"
              value={fields}
              placeholder="Fields"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="info"
              value={info}
              placeholder="Description"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Phone number"
              onChange={handleChange}
              className="input"
            />

            <input
              type="date"
              name="birthday"
              value={birthday}
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="address"
              value={address}
              placeholder="Address"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="github"
              value={github}
              placeholder="Github"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="linkedin"
              value={linkedin}
              placeholder="Linkedin"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="telegram"
              value={telegram}
              placeholder="Telegram"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="instagram"
              value={instagram}
              placeholder="Instagram"
              onChange={handleChange}
              className="input"
            />

            <input
              type="text"
              name="youtube"
              value={youtube}
              placeholder="YouTube"
              onChange={handleChange}
              className="input"
            />

            <button className="save-button add-button">Save</button>
          </form>
        </Fragment>
      )}
    </div>
  );
}

function EditPassword() {
  const objPassword = {
    username: "",
    currentPassword: "",
    newPassword: "",
  };

  const [password, setPassword] = useState(objPassword);

  const { username, currentPassword, newPassword } = password;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await request.put("auth/updatepassword", password);
      toast.success("Update Password");
      setPassword(objPassword);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPassword({ ...password, [name]: value });
  };

  return (
    <div
      style={{ height: "calc(100vh - 150px)" }}
      className="overflow-y-scroll"
    >
      <form onSubmit={submit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-base">
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
            className="input"
          />

          <div className="relative">
            <input
              required
              onChange={handleChange}
              value={currentPassword}
              id="currentPassword"
              name="currentPassword"
              className="input"
              type="password"
              placeholder="Current Password"
            />
          </div>

          <div className="relative">
            <input
              required
              onChange={handleChange}
              value={newPassword}
              id="newPassword"
              name="newPassword"
              className="input"
              placeholder="New Password"
              type="password"
            />
          </div>
        </div>

        <div>
          <button className="button mt-4">Save</button>
        </div>
      </form>
    </div>
  );
}

function IconAccount() {
  return (
    <span className="flex items-center">
      <i className="fa-regular fa-user px-1"></i>
      <p className="text-sm font-semibold">Account info</p>
    </span>
  );
}

function IconSecurity() {
  return (
    <span className="flex items-center">
      <i className="bi bi-shield-lock-fill pr-1"></i>
      <p className="text-sm font-semibold ">Passwords</p>
    </span>
  );
}
