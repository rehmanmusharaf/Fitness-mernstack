import React, { useState } from "react";
import "./AdminForm.css"; // Import your CSS file

function MultiStepForm() {
  const [current, setCurrent] = useState(1);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = () => {
    alert("Your Form Successfully Signed up");
    setCurrent(1);
  };

  return (
    <div className="container">
      <header>Signup Form</header>
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="step">
          <p>Name</p>
          <div className={`bullet ${current >= 1 ? "active" : ""}`}>
            <span>1</span>
          </div>
          <div
            className={`check fas fa-check ${current >= 1 ? "active" : ""}`}
          ></div>
        </div>
        <div className="step">
          <p>Contact</p>
          <div className={`bullet ${current >= 2 ? "active" : ""}`}>
            <span>2</span>
          </div>
          <div
            className={`check fas fa-check ${current >= 2 ? "active" : ""}`}
          ></div>
        </div>
        <div className="step">
          <p>Birth</p>
          <div className={`bullet ${current >= 3 ? "active" : ""}`}>
            <span>3</span>
          </div>
          <div
            className={`check fas fa-check ${current >= 3 ? "active" : ""}`}
          ></div>
        </div>
        <div className="step">
          <p>Submit</p>
          <div className={`bullet ${current >= 4 ? "active" : ""}`}>
            <span>4</span>
          </div>
          <div
            className={`check fas fa-check ${current >= 4 ? "active" : ""}`}
          ></div>
        </div>
      </div>
      {/* Form Pages */}
      <div className="form-outer">
        <form>
          {/* Page 1 */}
          <div className={`page slide-page ${current === 1 ? "active" : ""}`}>
            <div className="title">Basic Info:</div>
            <div className="field">
              <div className="label">First Name</div>
              <input type="text" />
            </div>
            <div className="field">
              <div className="label">Last Name</div>
              <input type="text" />
            </div>
            <div className="field">
              <button className="firstNext next" onClick={next}>
                Next
              </button>
            </div>
          </div>
          {/* Page 2 */}
          <div className={`page ${current === 2 ? "active" : ""}`}>
            <div className="title">Contact Info:</div>
            <div className="field">
              <div className="label">Email Address</div>
              <input type="text" />
            </div>
            <div className="field">
              <div className="label">Phone Number</div>
              <input type="Number" />
            </div>
            <div className="field btns">
              <button className="prev-1 prev" onClick={prev}>
                Previous
              </button>
              <button className="next-1 next" onClick={next}>
                Next
              </button>
            </div>
          </div>
          {/* Page 3 */}
          <div className={`page ${current === 3 ? "active" : ""}`}>
            <div className="title">Date of Birth:</div>
            <div className="field">
              <div className="label">Date</div>
              <input type="text" />
            </div>
            <div className="field">
              <div className="label">Gender</div>
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field btns">
              <button className="prev-2 prev" onClick={prev}>
                Previous
              </button>
              <button className="next-2 next" onClick={next}>
                Next
              </button>
            </div>
          </div>
          {/* Page 4 */}
          <div className={`page ${current === 4 ? "active" : ""}`}>
            <div className="title">Login Details:</div>
            <div className="field">
              <div className="label">Username</div>
              <input type="text" />
            </div>
            <div className="field">
              <div className="label">Password</div>
              <input type="password" />
            </div>
            <div className="field btns">
              <button className="prev-3 prev" onClick={prev}>
                Previous
              </button>
              <button className="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MultiStepForm;
