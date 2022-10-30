import * as React from 'react';


export default function BasicSelectBatch({ batch, setBatch }) {

  const handleChange = (event) => {

    setBatch(event.target.value);
  };

  return (
    <form>
      <label htmlfor='batch'>batch</label>
      <input type='number' value={batch} onChange={handleChange}></input>
    </form>
  );
}
