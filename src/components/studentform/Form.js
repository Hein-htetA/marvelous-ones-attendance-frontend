import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './form.css';
import FormInput from './FormInput';


function Form(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    batch: "",
    father: "",
    mother: "",
    birthDate: "",
    address: "",
    contactNo: "",
    education: "",
    nrc: "",
    occupation: "",
    jobDepartment: "",
    level: "elementary"
  });

  const [formErrors, setFormErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);
  const [registerStatus, setRegisterStatus] = useState({
    isLoading: false,
    err: false,
    success: false,
    result: {}
  })

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Name",
      label: "Name",
    },
    {
      id: 2,
      name: "batch",
      type: "number",
      placeholder: "Batch Number",
      label: "Batch Number",
    },
    {
      id: 3,
      name: "father",
      type: "text",
      placeholder: "Father's Name",
      label: "Father",
    },
    {
      id: 4,
      name: "mother",
      type: "text",
      placeholder: "Mother's Name",
      label: "Mother"
    },
    {
      id: 5,
      name: "birthDate",
      type: "date",
      placeholder: 'Birth Date',
      label: "Birth Date"
    },
    {
      id: 6,
      name: "address",
      type: "text",
      placeholder: "Address",
      label: "Address",
    },
    {
      id: 7,
      name: "contactNo",
      type: "text",
      placeholder: "Contact No.",
      label: "Contact No.",
    },
    {
      id: 8,
      name: "education",
      type: "text",
      placeholder: "Education",
      label: "Education",
    },
    {
      id: 9,
      name: "nrc",
      type: "text",
      placeholder: "NRC Number",
      label: "NRC Number",
    },
    {
      id: 10,
      name: "occupation",
      type: "text",
      placeholder: "Occupation",
      label: "Occupation",
    },
    {
      id: 11,
      name: "jobDepartment",
      type: "text",
      placeholder: "Job Department",
      label: "Job Department",
    } 
  ]

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "is required!"
    } 
    if (!values.batch) {
      errors.batch = "is required!"
    } else if (values.batch < 1) {
      errors.batch = "is not valid!"
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
          'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`
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
          console.log(data)
          setRegisterStatus({err: false, success: true, isLoading: false, result: data.name})
        })
        .catch((err) => {
          setRegisterStatus({success: false, err: true, isLoading: false})
        })   

      setFormSubmit(false);
    }
  }, [formSubmit, formErrors])

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setFormSubmit(true);
  }

  const onBlur = (e) => {
    setFormErrors(validate(formValues))
  }

  const onChange = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value });
    setRegisterStatus({isLoading: false, err: false, success: false})
  }

  return (
    <div className="App">
      <h1>Registeration Form</h1>
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
            disabled={registerStatus.isLoading}
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
            <option value="advanced">Advanced</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </form>
      <Box
        sx={{
          height: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 0px'
        }}
      >
        {registerStatus.err && 
        <Typography variant='body1' color='error'>Something went wrong!</Typography>}
        {registerStatus.success && 
        <Typography variant='body1' color='green'>
          {registerStatus.result + " Is Successfully Registered"}
        </Typography>}
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
