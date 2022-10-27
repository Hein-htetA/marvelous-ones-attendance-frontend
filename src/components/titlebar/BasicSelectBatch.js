import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectBatch(props) {
  const [batch, setBatch] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  React.useEffect(() => {
    async function fetchApi() {
      setIsLoading(true);
      try {
        let response = await fetch(`http://localhost:5000/api/v1/students?batch=${batch}`);
        response = await response.json();
        props.setStudents(response.studentsByBatch)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    try {
      fetchApi();
    } catch (error) {
      console.log(error)
    }
   

  }, [batch])

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <Select
          value={batch}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Batch I</MenuItem>
          <MenuItem value={2}>Batch II</MenuItem>
          <MenuItem value={3}>Batch III</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
