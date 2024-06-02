import React, { useState } from "react";
import "./Form.css";
import { MdCancel } from "react-icons/md";
const Form = ({ setClick, name, setCount, handleupdation }) => {
  function func(e) {
    e.preventDefault();
    console.log("func run");
  }
  return (
    <>
      <div className={`overlay`}></div>
      <div className={`limiter overlay-content`}>
        <div class="container-login100">
          <div class="wrap-login100">
            <form class="login100-form validate-form">
              <MdCancel
                style={{ top: "2%", right: "3%" }}
                className=" position-absolute fs-3 "
                onClick={() => setClick(false)}
              />
              <span
                class="login100-form-title p-b-26 fs-5"
                style={{ fontFamily: "sans-serif" }}
              >
                Update {name} value{" "}
              </span>
              <span class="login100-form-title p-b-48">
                <i class="zmdi zmdi-font"></i>
              </span>

              <div
                class="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                <input
                  class="input100 border-0 mb-0"
                  type="number"
                  name="count"
                  required
                  onChange={(e) => setCount(e.target.value)}
                />
                <span class="focus-input100" data-placeholder="Count"></span>
              </div>

              {/* <div
                class="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span class="btn-show-pass">
                  <i class="zmdi zmdi-eye"></i>
                </span>
                <input class="input100" type="password" name="pass" required />
                <span class="focus-input100" data-placeholder="Password"></span>
              </div> */}
              <button
                className=" btn btn-success text-center"
                onClick={(e) => handleupdation(e)}
              >
                update
              </button>
              {/* <div class=" text-center">
                <div class="">
                  <div class=""></div>
                  <button
                    class="btn btn-outline-success"
                    // onClick={() => handleupdation(e)}
                  >
                    Update Value
                  </button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      <div id="dropDownSelect1"></div>
    </>
  );
};

export default Form;
