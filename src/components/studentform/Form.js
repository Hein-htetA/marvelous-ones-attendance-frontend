import { useState } from 'react';
import './form.css';
import FormInput from './FormInput';

function Form(props) {
  const [values, setValues] = useState({
    name: "",
    father: "",
    mother: "",
    batch: "",
    address: "",
    nrc: "",
    level: "elementary"
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage: "Username should be 3-6 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "father",
      type: "text",
      placeholder: "Father's Name",
      label: "Father",
    },
    {
      id: 3,
      name: "mother",
      type: "text",
      placeholder: "Mother's Name",
      label: "Mother"
    },
    {
      id: 4,
      name: "batch",
      type: "number",
      placeholder: "Batch No.",
      errorMessage: 
      "Invalid batch number!",
      label: "Batch Number",
      pattern: "^[0-9]$",
      required: true
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 6,
      name: "nrc",
      type: "text",
      placeholder: "NRC No.",
      label: "NRC Number",
    },
  ]
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setOpen(false);
    props.setRegistering(true);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...values})
    };
    try {
      const newStudentData = await fetch('http://localhost:5000/api/v1/students', requestOptions);
      const newStudent = await newStudentData.json();
      console.log(newStudent);
      props.setRegistering(false)
    } catch (error) {
      console.log(error)
    }    
  }

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/> 
        ))}       
        <div className="formInput">
          <label>Level</label>
          <select id="level" name="level" 
            onChange={onChange}
          >
            <option value="elementary">Elementary</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Form;
