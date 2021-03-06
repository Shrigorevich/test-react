import React from "react";

const TableRow = props => {  
  return (
    <tr>
      <td  className="rel">
        <div className="del d-flex align-items-center justify-content-center" onClick={() => props.deleteUser(props.user.phone)}><i className="fas fa-times"/></div>
        {props.user.firstName}
      </td>
      <td>{props.user.lastName}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.age}</td>
      <td>
        {props.user.gender ? "male" : "female"}</td>
    </tr>
  );
};

export default TableRow;
