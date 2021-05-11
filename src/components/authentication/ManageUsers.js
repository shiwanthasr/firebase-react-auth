import React, { useState, useEffect } from "react";
import firebase from "firebase";

const ManageUsers = () => {
  const firestore = firebase.firestore();
  const [userDetails, setUserDetails] = useState([]);
  const [userData, setUserData] = useState({});

  const fetchUsers = async () => {
    setUserDetails([]);

    let response = [];

    if (localStorage.getItem("role") === "admin") {
      response = firestore.collection("users");
    } else if (localStorage.getItem("role") === "police_admin") {
      response = firestore.collection("users").where("role", "==", "police");
    } else if (localStorage.getItem("role") === "insurance_admin") {
      response = firestore.collection("users").where("role", "==", "insurance");
    }

    await response.get().then((snapshot) => {
      snapshot.docs.forEach((doc) =>
        setUserDetails((userDetails) => [...userDetails, doc.data()])
      );
    });
  };


  useEffect(() => {
    fetchUsers();
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
                Update System User Info
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
                Delete User
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
              Are you sure you want to delete this User ?
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
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">User Table</h3>
          </div>
          <div className="panel-body">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Name</th>
                  <th scope="col">Role</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Police Branch</th>
                  <th scope="col">Insurance Company</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userDetails &&
                  userDetails.map((user_data, index) => (
                    <tr key={user_data.email}>
                      <th scope="row">{index + 1}</th>
                      <td>{user_data.email}</td>
                      <td>{user_data.name}</td>
                      <td>{user_data.role}</td>
                      <td>{user_data.nic}</td>
                      <td>{user_data.police_branch}</td>
                      <td>{user_data.insurance_company}</td>
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

export default ManageUsers;
