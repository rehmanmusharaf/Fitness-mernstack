import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

export class StepFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
    };
    this.handleCheckedChanged = this.handleCheckedChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCheckedChanged(event) {
    this.setState({ checked: event.target.checked });
  }

  async handleSubmit() {
    if (this.state.checked) {
      try {
        const obj2 = this.props.obj.dietplan;
        if (
          obj2.morning.name !== "" &&
          obj2.morning.description !== "" &&
          obj2.afternoon.description !== "" &&
          obj2.afternoon.name !== "" &&
          obj2.evening.name !== "" &&
          obj2.evening.description !== ""
        ) {
          const { data } = await axios.post(
            `${process.env.REACT_APP_server}/api/dietregister`,
            { name: this.props.obj.name, dietplan: this.props.obj.dietplan },
            { withCredentials: true }
          );
          if (data.success) {
            toast.success("Diet Plan Added Successfully");
            window.location.reload("/");
          } else {
            toast.error(data.message);
          }
        } else {
          toast.error("Fill All Field Before Submiting!");
        }
      } catch (error) {
        toast.error("Somethin Went Wrong!");
        console.error("Error:", error);
      }
    } else {
      alert("Please accept the terms and conditions");
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="ten columns terms">
            <span>By clicking "Accept" I agree that:</span>
            <ul className="docs-terms">
              <li>
                I have read and accepted the <a href="#">User Agreement</a>
              </li>
              <li>
                I have read and accepted the <a href="#">Privacy Policy</a>
              </li>
              <li>I am at least 18 years old</li>
            </ul>
            <label>
              <input
                type="checkbox"
                checked={this.state.checked}
                onChange={this.handleCheckedChanged}
                autoFocus
              />
              <span> Accept </span>
            </label>
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}
