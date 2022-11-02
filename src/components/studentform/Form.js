import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './form.css';
import FormInput from './FormInput';


function Form(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    father: "",
    mother: "",
    batch: "",
    address: "",
    nrc: "",
    level: "elementary"
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [registerStatus, setRegisterStatus] = useState({
    isLoading: false,
    err: '',
    success: false
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Username",
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
      label: "Batch Number",
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

  const validate = (values) => {
    const errors = {};
    const regex = /^\d{1,2}\/\w{3}/;
    if (!values.name) {
      errors.name = "Name is required!"
    }
    if (!values.batch) {
      errors.batch = "Batch is required!"
    }
    if (!values.nrc) {
      errors.nrc = "NRC no is required!"
    }
    return errors
  }
  
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && formSubmit === true) {
      setRegisterStatus({err: false, isLoading: true, success: false})
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formValues})
      };
      fetch('http://localhost:5000/api/v1/students', requestOptions)
        .then((response) => {
          if (!response.ok) {
            console.log(response)
            throw Error(response.statusText)
          }
          return response.json();
        }) 
        .then((data) => {
          console.log(data);
          setRegisterStatus({...registerStatus, success: true, isLoading: false})
        })
        .catch((err) => {
          setRegisterStatus({...registerStatus, err: true, isLoading: false})
        })   

      setFormSubmit(false);
    }
  }, [formSubmit, formErrors])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setFormSubmit(true);
    console.log('in submit');
  }

  const onBlur = (e) => {
    console.log('on blur');
    setFormErrors(validate(formValues))
  }

  const onChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value });
  }

  return (
    <div className="App">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput 
            key={input.id} 
            {...input} 
            value={formValues[input.name]} 
            onChange={onChange}
            onBlur={onBlur}
            errorMsg={formErrors[input.name]}
            formSubmit={formSubmit}
          /> 
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
      </form>
      {
        JSON.stringify(formErrors)
      }
      <Box
        sx={{
          height: '25px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {registerStatus.err && 
        <Typography variant='body1' color='error'>Something went wrong!</Typography>}
        {registerStatus.success && 
        <Typography variant='body1' color='success'>Successfully Registered</Typography>}
      </Box>
      {
      registerStatus.isLoading ? 
        <button disabled>Registering</button> : 
        <button onClick={handleSubmit}>Register</button>
      }
    </div>
  );
}

export default Form;
