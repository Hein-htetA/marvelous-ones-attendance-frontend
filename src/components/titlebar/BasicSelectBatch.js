import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelectBatch({ setStudents, batch, setBatch, setIsLoading }) {

  const handleChange = (event) => {
    setBatch(event.target.value);
  };

  React.useEffect(() => {
    console.log('fetching students')
    async function fetchApi() {
      setIsLoading(true);
      try {
        let response = await fetch(`http://localhost:5000/api/v1/students?batch=${batch}`);
        response = await response.json();
        setStudents(response.studentsByBatch)
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
    fetchApi();
  }, [batch, setStudents, setIsLoading])

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
