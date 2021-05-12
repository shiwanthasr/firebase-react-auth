import React, { useState, useEffect } from "react";
import firebase from "firebase";

const PoliceReports = () => {
  const firestore = firebase.firestore();
  const [policeReportDetails, setpoliceReportDetails] = useState([]);

  const fetchPoliceReports = async () => {
    setpoliceReportDetails([]);

    let response = [];

    if (localStorage.getItem("role") === "admin") {
      response = firestore.collection("police_reports");
    } else if (localStorage.getItem("role") === "police_admin") {
      response = firestore.collection("police_reports");
    }

    await response.get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>
        setpoliceReportDetails((policeReportDetails) => [
          ...policeReportDetails,
          { ...doc.data(), id: doc.id },
        ])
      );
    });
  };

  const updateDocument = async () => {
    let db = firebase.firestore();

    let document_id = field_value("doc_id");

    db.collection("police_reports")
      .doc(document_id)
      .update({
        driver_name: field_value("driver_name"),
        licen_no: field_value("licen_no"),
        nic: field_value("nic"),
        vehicle_number: field_value("vehicle_no"),
        vehicle_model: field_value("vehicle_model"),
        model_year: field_value("model_year"),
        fined_amount: field_value("fined_amount"),
        traffic_violation: field_value("traffic_violation"),
      })
      .then((e) => {
        alert("Record updated successfully !");
        window.location.reload();
      });
  };

  const _ = async (e, value) => {
    document.getElementById(e).value = value;
  };
  const field_value = (e) => {
    return document.getElementById(e).value;
  };

  const _delete = async(e) => {
    let dataObject = e.currentTarget.getAttribute('data-attribute');
    dataObject = JSON.parse(dataObject);
    //console.log(dataObject.id);

    let document_id = dataObject.id;

    let db = firebase.firestore();

    db.collection("police_reports").doc(document_id).delete().then((e) => {
      alert("Record deleted successfully !");
      window.location.reload();
    });

  }

  const setValuesToModel = async (e) => {
    let dataObject = e.currentTarget.getAttribute("data-attribute");
    dataObject = JSON.parse(dataObject);

    _("driver_name", dataObject.driver_name);
    _("licen_no", dataObject.licen_no);
    _("nic", dataObject.nic);
    _("vehicle_no", dataObject.vehicle_number);
    _("vehicle_model", dataObject.vehicle_model);
    _("model_year", dataObject.model_year);
    _("traffic_violation", dataObject.traffic_violation);
    _("fined_amount", dataObject.fined_amount);
    _("doc_id", dataObject.id);
  };

  useEffect(() => {
    fetchPoliceReports();
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
                Update Police Report Info
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
                <label className="font-weight-bold">Driver Name : </label>
                <input
                  className="form-control"
                  id="driver_name"
                  placeholder="Type here .."
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">License No : </label>
                <input
                  className="form-control"
                  id="licen_no"
                  placeholder="Type here .."
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">NIC : </label>
                <input
                  className="form-control"
                  id="nic"
                  placeholder="Type here .."
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Vehicle No : </label>
                <input
                  className="form-control"
                  id="vehicle_no"
                  placeholder="Type here .."
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Vehicle Model : </label>
                <input
                  className="form-control"
                  id="vehicle_model"
                  placeholder="Type here .."
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold">Model Year : </label>
                <input
                  className="form-control"
                  id="model_year"
                  placeholder="Type here .."
                />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Traffic Violation : </label>
                <input
                  className="form-control"
                  id="traffic_violation"
                  placeholder="Type here .."
                />
              </div>
              <div className="form-group">
                <label className="font-weight-bold">Fined Amount : </label>
                <input
                  className="form-control"
                  id="fined_amount"
                  placeholder="Type here .."
                />
              </div>

              <input type="hidden" id="doc_id" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={updateDocument}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mt-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Police Report Table</h3>
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
                  <th scope="col">Traffic Violation</th>
                  <th scope="col">Fined Amount</th>
                  <th scope="col">Date and Time</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {policeReportDetails &&
                  policeReportDetails.map((police_report_data, index) => (
                    <tr key={police_report_data.timestamp}>
                      <th scope="row">{index + 1}</th>
                      <td>{police_report_data.driver_name}</td>
                      <td>{police_report_data.licen_no}</td>
                      <td>{police_report_data.nic}</td>
                      <td>{police_report_data.vehicle_number}</td>
                      <td>{police_report_data.vehicle_model}</td>
                      <td>{police_report_data.model_year}</td>
                      <td>{police_report_data.traffic_violation}</td>
                      <td>{police_report_data.fined_amount}</td>
                      <td>{police_report_data.timestamp}</td>
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
                            data-attribute={JSON.stringify(police_report_data)}
                            data-dock-id={police_report_data.id}
                            onClick={setValuesToModel}
                          >
                            Edit
                          </button>
                          <button
                            id="submit"
                            type="button"
                            className="btn btn-danger"
                            data-attribute={JSON.stringify(
                              police_report_data
                            )}
                            onClick={_delete}
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

export default PoliceReports;
