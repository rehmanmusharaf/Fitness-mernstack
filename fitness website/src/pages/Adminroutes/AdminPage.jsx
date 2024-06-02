import React, { useState } from "react";
import { LuHome } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import AdminHome from "./AdminHome";
import AdminProfile from "./AdminProfile";
const AdminPage = () => {
  let [active, setActive] = useState(1);
  return (
    <>
      <div style={{ marginTop: "80px" }}></div>
      <div className=" w-100 h-auto d-flex mt-2 p-2">
        <div
          className=" w-50 text-center "
          style={{ color: `${active == 1 ? "blue" : ""}` }}
        >
          <LuHome
            className=" fs-1"
            style={{ cursor: "pointer" }}
            onClick={() => setActive(1)}
          />
        </div>
        <div
          className=" w-50 text-center "
          style={{ color: `${active == 2 ? "blue" : ""}` }}
        >
          <FaUser
            className=" fs-1 "
            style={{ cursor: "pointer" }}
            onClick={() => setActive(2)}
          />
        </div>
      </div>
      <hr />
      <div style={{ minHeight: "60vh" }}>
        {active == 1 ? <AdminHome /> : <AdminProfile />}
      </div>
    </>
  );
};

export default AdminPage;
