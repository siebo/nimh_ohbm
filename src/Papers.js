import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';

function Papers() {
  return (
    <div className="App">

        <TextField
          id="searchtext"
          label="Instatution Name"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />

        <Button variant="contained">Search</Button>

    </div>
  );
}

export default Papers;
