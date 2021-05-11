import React, { useState, useEffect } from "react";
import { useTable, useSortBy } from "react-table";

function Example() {
  const data = React.useMemo(
    () => [
      {
        col1: "Minsk",
        col2: "27",
        col3: "rain",
      },
      {
        col1: "Vilnius",
        col2: "30",
        col3: "rain",
      },
      {
        col1: "London",
        col2: "23",
        col3: "rain",
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body bg-light">
            <div>
            <table className="mx-auto" {...getTableProps()} style={{ border: "solid 1px gray" }}>
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
                          borderRight:"solid 1px gray",
                          color: "black",
                          fontWeight: "normal",
                          padding:"5px",
                          fontSize:"0.9em"
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
