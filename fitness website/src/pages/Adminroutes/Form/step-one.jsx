import React from "react";
export class StepOne extends React.Component {
  constructor(props) {
    super(props); // Accept and pass props to the parent class constructor
    this.state = {
      firstName: "",
      lastName: "",
    };
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleMorningDiet = this.handleMorningDiet.bind(this);
  }

  handleFirstNameChanged(event) {
    this.setState({ firstName: event.target.value });
  }

  handleLastNameChanged(event) {
    this.setState({ lastName: event.target.value });
  }

  handleRadioChange(event) {
    this.props.setName(event.target.value);
    console.log(event.target.value);
  }

  handleMorningDiet(event) {
    this.props.setMorningdiet(event.target.value);
    console.log(event.target.value);
  }

  render() {
    return (
      <div className="d-flex justify-content-center flex-column">
        <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="loose-weight"
              onChange={this.handleRadioChange}
            />
            <label className="form-check-label ps-0" htmlFor="inlineRadio1">
              Loose Weight Diet
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="gain-weight"
              onChange={this.handleRadioChange}
            />
            <label className="form-check-label ps-0" htmlFor="inlineRadio2">
              Gain Weight Diet
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              value="fitness"
              onChange={this.handleRadioChange}
            />
            <label className="form-check-label ps-0" htmlFor="inlineRadio3">
              Loose|Gain + Body Building Weight Diet
            </label>
          </div>
        </div>
        <div className="row">
          <div className="six columns w-100">
            <select className="form-select" aria-label="Default select example">
              <option value="morning" selected>
                Morning
              </option>
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
                value={this.props.morningdiet}
                placeholder="Enter Morning Diet Plan"
                onChange={this.handleMorningDiet}
                required={true}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
