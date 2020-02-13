import React, {useState, useEffect} from 'react'

import Table from '../components/Table'

const Wrapper = () => {

   const [error, setError] = useState(null)
   const [form, setForm] = useState({
      firstName: '',
      lastName: '',
      phone: '',
      gender: null,
      age: null
   })

   const changeHandler = event => {      
      setForm({...form, [event.target.name]: event.target.value})
      //comment
   }

   const validation = () => {
      if (form.firstName.length === 0){
         setError('Enter your first name')
      }else if(form.lastName.length === 0){
         setError('Enter your last name')
      }else if(form.phone.length !== 10 || /\D/.test(form.phone)){
         setError('Invalid number')
      }else if(form.age < 18){
         setError('You are under 18 years old')
      }else{
         setError(null)
      }
   }

   return (
         <div className="wrapper">
            <div className="form">
            <div className="formElement">
               <input 
                  type="text" 
                  name="firstName"
                  placeholder=""
                  className=""
                  onChange={changeHandler}
               />
            </div>

            <div className="formElement">
               <input 
                  type="text" 
                  name="lastName"
                  placeholder=""
                  className=""
                  onChange={changeHandler}
               />
            </div>

            <div className="formElement">
               <input 
                  type="text" 
                  name="phone"
                  placeholder=""
                  className=""
                  onChange={changeHandler}
               />
            </div>
            
            <div className="formElement">
               <input 
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
                  onClick={changeHandler}
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
         <Table/>
      </div>
   )
}

export default Wrapper
