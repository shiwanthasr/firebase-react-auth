import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";

function Example() {
  const data = React.useMemo(
    () => [
      {
        email: "test@gmail.com",
        insurance_company: "N/A",
        name: "Test Polcie - Agent",
        nic: "45785121v",
        police_branch: "Koswatta",
        role: "police : officer",
        action: (
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#exampleModal">Edit</button>
                                                            <button type="button" class="btn btn-sm btn-danger">Remove</button>
                                                          </div>`,
            }}
          />
        ),
      },
      {
        email: "test2@gmail.com",
        insurance_company: "N/A",
        name: "Test Polcie 2 - Agent",
        nic: "98625321v",
        police_branch: "Kotikawaththa",
        role: "police : officer",
        action: (
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                                            <button type="button" class="btn btn-sm btn-danger">Remove</button>
                                                          </div>`,
            }}
          />
        ),
      },
      {
        email: "test@gmail.com",
        insurance_company: "Co-Op Insurance (Malabe)",
        name: "Test insurance - Agent",
        nic: "58912498v",
        police_branch: "N/A",
        role: "Insurance : agent",
        action: (
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="btn-group" role="group" aria-label="Basic example">
                                                            <button type="button" class="btn btn-sm btn-secondary">Edit</button>
                                                            <button type="button" class="btn btn-sm btn-danger">Remove</button>
                                                          </div>`,
            }}
          />
        ),
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Email",
        accessor: "email", // accessor is the "key" in the data
      },
      {
        Header: "Insurance Company",
        accessor: "insurance_company",
      },
      {
        Header: "Name",
        accessor: "name", // accessor is the "key" in the data
      },
      {
        Header: "NIC",
        accessor: "nic", // accessor is the "key" in the data
      },
      {
        Header: "Police Branch",
        accessor: "police_branch", // accessor is the "key" in the data
      },
      {
        Header: "Role",
        accessor: "role", // accessor is the "key" in the data
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title text-light" id="exampleModalLabel">
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
                  <label className="font-weight-bold">Insurace Company : </label>
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

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <span className="font-weight-bold">Mange Users</span>
              </div>
              <div className="card-body bg-light">
                <table
                  className="mx-auto w-100"
                  {...getTableProps()}
                  style={{ border: "solid 1px gray" }}
                >
                  <thead>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            style={{
                              borderBottom: "solid 1px gray",
                              borderRight: "solid 1px gray",
                              color: "black",
                              fontWeight: "normal",
                              padding: "5px",
                              fontSize: "0.9em",
                            }}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? "🔽"
                                  : "🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td
                                {...cell.getCellProps()}
                                style={{
                                  padding: "10px",
                                  border: "solid 1px gray",
                                }}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
