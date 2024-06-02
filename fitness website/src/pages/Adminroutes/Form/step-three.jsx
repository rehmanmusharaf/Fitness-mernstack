import React from "react";

export class StepThree extends React.Component {
  constructor(props) {
    super(props); // Accept props
    this.state = {
      password: "",
      passwordConfirm: "",
    };
    this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    this.handlePasswordConfirmChanged =
      this.handlePasswordConfirmChanged.bind(this);
    this.handleEveningDiet = this.handleEveningDiet.bind(this); // Bind the new method
  }

  handlePasswordChanged(event) {
    this.setState({ password: event.target.value });
  }

  handlePasswordConfirmChanged(event) {
    this.setState({ passwordConfirm: event.target.value });
  }

  handleEveningDiet(event) {
    this.props.setEveningdiet(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="six columns w-100 ">
            <select className="form-select" aria-label="Default select example">
              <option value="1">Evening</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="six columns w-100 ">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Write Evening Diet Plan
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={this.props.eveningdiet} // Use prop for value
                onChange={this.handleEveningDiet} // Use new method for onChange
              ></textarea>
            </div>
          </div>
        </div>
        {/* 
        <div className="row">
          <div className="six columns w-100 ">
            <label>Password</label>
            <input
              className="u-full-width required"
              placeholder="Password"
              type="password"
              onChange={this.handlePasswordChanged}
              value={this.state.password}
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns w-100 ">
            <label>Confirm password</label>
            <input
              className="u-full-width"
              placeholder="Confirm Password"
              type="password"
              onChange={this.handlePasswordConfirmChanged}
              value={this.state.passwordConfirm}
            />
          </div>
        </div> */}
      </div>
    );
  }
}
