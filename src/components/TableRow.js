import React from "react";

const TableRow = props => {  
  return (
    <tr>
      <td>{props.user.firstName}</td>
      <td>{props.user.lastName}</td>
      <td>{props.user.phone}</td>
      <td>{props.user.age}</td>
      <td>{props.user.gender ? "male" : "female"}</td>
      <td onClick={() => props.deleteUser(props.user.phone)}>x</td>
    </tr>
  );
};

export default TableRow;
