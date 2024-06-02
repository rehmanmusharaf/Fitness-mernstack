import React from "react";

export class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailConfirm: "",
    };
    this.handleEmailChanged = this.handleEmailChanged.bind(this);
    this.handleEmailConfirmChanged = this.handleEmailConfirmChanged.bind(this);
    this.handleAfternoonDiet = this.handleAfternoonDiet.bind(this); // Bind this method
  }

  handleEmailChanged(event) {
    this.setState({ email: event.target.value });
  }

  handleEmailConfirmChanged(event) {
    this.setState({ emailConfirm: event.target.value });
  }

  handleAfternoonDiet(event) {
    this.props.setAfternoondiet(event.target.value);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="six columns w-100">
            <select className="form-select" aria-label="Default select example">
              <option value="afternoon">Afternoon</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="six columns w-100">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Write Diet Plan
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={this.handleAfternoonDiet} // Use this.handleAfternoonDiet
              ></textarea>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="six columns w-100 ">
            <label>Your email</label>
            <input
              className="u-full-width required"
              placeholder="test@mailbox.com"
              type="email"
              onChange={this.handleEmailChanged}
              value={this.state.email}
              autoFocus
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns w-100 ">
            <label>Confirm email</label>
            <input
              className="u-full-width"
              placeholder="Confirm email"
              type="email"
              onChange={this.handleEmailConfirmChanged}
              value={this.state.emailConfirm}
            />
          </div>
        </div> */}
      </div>
    );
  }
}
