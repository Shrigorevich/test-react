import React from "react";
import TableRow from "./TableRow";

const Table = props => {
  return (
    <div className="col-md-7 p-4">
      <table>
        <thead>
          <tr>
            <th data-value="firstName" onClick={props.sorting}>First name</th>
            <th data-value="lastName" onClick={props.sorting}>Last name</th>
            <th data-value="phone" onClick={props.sorting}>Phone</th>
            <th data-value="age" onClick={props.sorting}>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {props.users
            ? props.users.map((user, i) => (<TableRow user={user} key={i} deleteUser={props.deleteUser}/>))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
