/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

class AddAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    const {
      petName, ownerName, aptDate, aptTime, aptNotes,
    } = this.state;

    const { addAppointments, toggleForm } = this.props;
    e.preventDefault();
    const tempApt = {
      petName,
      ownerName,
      aptDate: `${aptDate} ${aptTime}`,
      aptNotes,
    };
    addAppointments(tempApt);
    this.setState({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    });
    toggleForm();
  }

  handleChange(e) {
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { formDisplay, toggleForm } = this.props;
    const {
      petName, ownerName, aptDate, aptTime, aptNotes,
    } = this.state;
    return (
      <div
        className={`card textcenter mt-3 ${
          formDisplay ? '' : 'add-appointment'
        }`}
      >
        <div
          role="button"
          className="apt-addheading card-header bg-primary text-white"
          onClick={toggleForm}
        >
          <FaPlus />
          {' '}
          Add Appointment
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="petName"
                readOnly
              >
                Pet Name
                {' '}
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="petName"
                  id="petName"
                  placeholder="Pet's Name"
                  value={petName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="ownerName"
              >
                Pet Owner
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  id="ownerName"
                  placeholder="Owner's Name"
                  value={ownerName}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptDate"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="aptDate"
                  id="aptDate"
                  value={aptDate}
                  onChange={this.handleChange}
                />
              </div>

              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={aptTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="aptNotes">
                Apt. Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="aptNotes"
                  id="aptNotes"
                  placeholder="Appointment Notes"
                  value={aptNotes}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddAppointments.propTypes = {
  addAppointments: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  formDisplay: PropTypes.string.isRequired,
};

export default AddAppointments;
