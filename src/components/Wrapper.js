import React, { useState, useEffect } from "react";

import Table from "../components/Table";

const Wrapper = () => {
  const [error, setError] = useState(null);

  const [users, setUser] = useState({
    arr: JSON.parse(localStorage.getItem("users")) || []
  });

  const [form, setForm] = useState(() => (
    {
      firstName: "",
      lastName: "",
      phone: "",
      gender: true,
      age: 0,
    }
  ));

  useEffect(() => {
    console.log(users.arr);
    
    localStorage.setItem("users", JSON.stringify(users.arr));
  }, [users]);

  const changeHandler = event => {
    if (event.target.value === "true") {
      setForm({ ...form, [event.target.name]: true });
    } else if (event.target.value === "false") {
      setForm({ ...form, [event.target.name]: false });
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const validation = () => {
    if (form.firstName.length === 0) {
      setError("Enter your first name");
    } else if (form.lastName.length === 0) {
      setError("Enter your last name");
    } else if (form.phone.length !== 10 || /\D/.test(form.phone)) {
      setError("Invalid number");
    } else if (form.age < 18) {
      setError("You are under 18 years old");
    } else {
      setUser(users => ({
        arr: [...users.arr, { ...form }]
      }));
      setError(null);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        gender: true,
        age: 0
      });
    }
  };

  const sorting = event => {
    let key = event.target.dataset.value;
    setUser({
      arr: [
        ...users.arr.sort((a, b) => {
          return a[key] > b[key] ? 1 : -1;
        })
      ]
    });
  };

  const deleteUser = (userPhone) => {
    console.log(userPhone);
    
    setUser({
      arr: [
        ...users.arr.filter((item, i) => (
          item.phone != userPhone
        ))
      ]
    })
  }  

  return (
    <div className="wrapper">
      <div className="form">
        <div className="formElement">
          <input
            value={form.firstName}
            type="text"
            name="firstName"
            placeholder=""
            className=""
            onChange={changeHandler}
          />
        </div>

        <div className="formElement">
          <input
            value={form.lastName}
            type="text"
            name="lastName"
            placeholder=""
            className=""
            onChange={changeHandler}
          />
        </div>

        <div className="formElement">
          <input
            value={form.phone}
            type="text"
            name="phone"
            placeholder=""
            className=""
            onChange={changeHandler}
          />
        </div>

        <div className="formElement">
          <input
            value={form.age}
            type="number"
            name="age"
            placeholder=""
            className=""
            onChange={changeHandler}
          />
        </div>

        <div className="formElement">
          <input
            type="radio"
            name="gender"
            id="male"
            value="true"
            onChange={changeHandler}
          />
          <label htmlFor="male">male</label>

          <input
            type="radio"
            name="gender"
            id="female"
            value="false"
            onClick={changeHandler}
          />
          <label htmlFor="female">female</label>
        </div>
        {error ? <span>{error}</span> : null}
        <div className="formElement">
          <button onClick={validation}>Add User</button>
        </div>
      </div>
      <Table
        users={users.arr.length === 0 ? null : users.arr}
        sorting={sorting}
        deleteUser={deleteUser}
      />
    </div>
  );
};

export default Wrapper;
