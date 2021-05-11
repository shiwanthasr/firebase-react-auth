import React, { useState, useEffect } from "react";
import firebase from "firebase";

const InsuranceReports = () => {
  const firestore = firebase.firestore();
  const [insuranceReportDetails, setinsuranceReportDetails] = useState([]);

  const fetchInsuranceReports = async () => {
    setinsuranceReportDetails([]);

    let response = [];

    if (localStorage.getItem("role") === "admin") {
      response = firestore.collection("insurance_reports");
    } else if (localStorage.getItem("role") === "insurance_admin") {
      response = firestore.collection("insurance_reports");
    }

    await response.get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>
        setinsuranceReportDetails((insuranceReportDetails) => [...insuranceReportDetails, doc.data()])
      );
    });
  };


  useEffect(() => {
    fetchInsuranceReports();
  }, [firestore, localStorage.getItem("user_uid")]);

  return (
    <>
      {/* Edit Model */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-light" id="editModalLabel">
                Update Insurance Report Info
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="font-weight-bold">Email : </label>
                <input className="form-control" placeholder="Type here .." />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Name : </label>
                <input className="form-control" placeholder="Type here .." />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">NIC : </label>
                <input className="form-control" placeholder="Type here .." />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Police Branch : </label>
                <input className="form-control" placeholder="Type here .." />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Insurace Company : </label>
                <input className="form-control" placeholder="Type here .." />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Model */}

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-light" id="deleteModalLabel">
                Delete Insurance Report
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Report ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mt-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Insurance Report Table</h3>
          </div>
          <div className="panel-body">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Driver Name</th>
                  <th scope="col">License No</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Vehicle No</th>
                  <th scope="col">Vehicle Model</th>
                  <th scope="col">Model Year</th>
                  <th scope="col">Estimate Amount</th>
                  <th scope="col">Location</th>
                  <th scope="col">Note</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {insuranceReportDetails &&
                  insuranceReportDetails.map((insurance_report_data, index) => (
                    <tr key={insurance_report_data.uid}>
                      <th scope="row">{index + 1}</th>
                      <td>{insurance_report_data.driver_name}</td>
                      <td>{insurance_report_data.licen_no}</td>
                      <td>{insurance_report_data.nic}</td>
                      <td>{insurance_report_data.vehicle_number}</td>
                      <td>{insurance_report_data.vehicle_model}</td>
                      <td>{insurance_report_data.model_year}</td>
                      <td>{insurance_report_data.estimate_amount}</td>
                      <td>{insurance_report_data.latitude} - {insurance_report_data.longitude}</td>
                      <td>{insurance_report_data.note}</td>
                      <td>{insurance_report_data.timestamp}</td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="action btns"
                        >
                          <button
                            type="button"
                            className="btn btn-warning"
                            data-toggle="modal"
                            data-target="#editModal"
                          >
                            Edit
                          </button>
                          <button
                            id="submit"
                            type="button"
                            className="btn btn-danger"
                            data-toggle="modal"
                            data-target="#deleteModal"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script>alert(2)</script>
    </>
  );
};

export default InsuranceReports;
