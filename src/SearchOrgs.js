import React from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Papers() {
  return (
    <div className="App">

		<Typography variant="h2" gutterBottom>
		  Search by Institution
		</Typography>

		<Typography variant="body1" gutterBottom>
			Here you can search for an Organization by name to find their associated paper references in our database.
	    </Typography>

        <TextField
          id="searchtext"
          label="Institution Name"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
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
