import React from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom'




function Org() {
  const {id} = useParams();
  return (
    <div className="App">

		<Typography variant="h2" gutterBottom>
		  {id}
		</Typography>

    </div>
  );
}

export default Org;
