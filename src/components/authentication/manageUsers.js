import React, { useState, useEffect } from "react";
import firebase from "firebase";

const ManageUsers = () => {
  const firestore = firebase.firestore();
  let [userDetails, setUserDetails] = useState([]);

  const fetchUsers = async () => {
    const response = firestore.collection("users");
    const data = await response.get();
    data.docs.forEach((item) => {
      setUserDetails([...userDetails, item.data()]);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{userDetails.map(itm=>{ return <li>{itm.name}</li> })}</h3>
        </div>
        <div class="panel-body">
          <table class="table table-stripe">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {userDetails &&
                userDetails.map((user_data) => (
                  <tr>
                    {/* <td><Link to={`/show/${board.key}`}>{board.title}</Link></td> */}
                    <td key={user_data.email}>{user_data.email}</td>
                    <td key={user_data.name}>{user_data.name}</td>
                    <td key={user_data.role}>{user_data.role}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
