import React, { useState, useEffect } from "react";

import Table from "../components/Table";

const Wrapper = () => {
  const [error, setError] = useState({
      firstName: false,
      lastName: false,
      phone: false,
      gender: false,
      age: false,
      message: ''
  });
  const [users, setUser] = useState({
    arr: JSON.parse(localStorage.getItem("users")) || []
  });

  const [form, setForm] = useState(() => (
    {
      firstName: "",
      lastName: "",
      phone: "",
      gender: true,
      age: 0
    }
  ));


  useEffect(() => {
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
      setError(() => ({
        ...error, firstName: true, message: 'Enter your first name!'
      }));
    } else if (form.lastName.length === 0) {
      setError(() => ({
        ...error, lastName: true, firstName: false, message: 'Enter your last name!'
      }));
    } else if (form.phone.length !== 10 || /\D/.test(form.phone)) {
      setError(() => ({
        ...error, phone: true, lastName: false, message: 'Incorrect phone!'
      }));
    } else if (users.arr.filter(item => (item.phone === form.phone)).length !== 0) {
      setError(() => ({
        ...error, phone: true, message: 'This phone is already registered!'
      }));
    } else if (form.age < 18) {
      setError(() => ({
        ...error, age: true, phone: false, message: 'You are under 18 years old!'
      }));
    } else {
      setUser(users => ({
        arr: [...users.arr, { ...form }]
      }));
      setError({
        firstName: false,
        lastName: false,
        phone: false,
        gender: false,
        age: false,
        message: ''
      });
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        gender: true,
        age: 0
      });
      document.getElementById('form').reset()
    }
  };

  const sorting = event => {
    let key = event.target.dataset.value;
    setUser({
      arr: [
        ...users.arr.sort((a, b) => {
          let aKey = a[key].toLowerCase()
          let bKey = b[key].toLowerCase()
          if(aKey > bKey) return 1
          if(aKey < bKey) return -1
          return 0
        })
      ]
    });
  };

  const deleteUser = (userPhone) => {
    setUser({
      arr: [
        ...users.arr.filter((item, i) => (
          item.phone !== userPhone
        ))
      ]
    })
  }  

  return (
    <div className="wrapper row">
      <div className="form col-5 p-4">
        <form id='form'>
        <div className="form-group px-5">
          <div className="formElement mb-3">
            <input
              value={form.firstName}
              type="text"
              name="firstName"
              placeholder="First name"
              className={error.firstName ? "form-control invalid" : "form-control"}
              onChange={changeHandler}
            />
          </div>

          <div className="formElement mb-3">
            <input
              value={form.lastName}
              type="text"
              name="lastName"
              placeholder="Last name"
              className={error.lastName ? "form-control invalid" : "form-control"}
              onChange={changeHandler}
            />
          </div>


          <div className="formElement mb-3">
            <input
              value={form.phone}
              type="text"
              name="phone"
              placeholder="Phone: 10 digits"
              className={error.phone ? "form-control invalid" : "form-control"}
              onChange={changeHandler}
            />
          </div>

          <div className="formElement mb-3">
            <input
              type="number"
              name="age"
              placeholder="Age"
              className={error.age ? "form-control invalid" : "form-control"}
              onChange={changeHandler}
            />
          </div>
          <div className="form-row m-0 p-0 justify-content-between">
            <div className="formElement mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="true"
                  onClick={changeHandler}
                />
                <label className="form-check-label" htmlFor="male">male</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="false"
                  onClick={changeHandler}
                />
                <label className="form-check-label" htmlFor="female">female</label>
              </div>
            </div>
            <div className="formElement">
              <button onClick={validation} type="button" className="btn btn-secondary">Add user</button>
            </div>
          </div>  
          <span className="error">{error.message}</span>        
        </div>
        </form>

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
