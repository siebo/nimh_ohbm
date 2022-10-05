import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './App.css';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts"
import axios from "axios";

class CustomTooltip extends React.Component {

  getPiName(label) {
    return this.props.piDict[label];
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      console.log(payload);
      console.log(label);
      return (
        <div className="custom-tooltip">
          <p className="label">{this.getPiName(payload[0].value)}</p>
          <p className="desc">{label}</p>
        </div>
      );
    }

    return null;
  }
};


function GraphResIRP() {

	const [piData, setPiData] = useState("");
	const [piDict, setPiDict] = useState({});
	const history = useHistory();

	useEffect(() => {
	  refreshList();
	}, [])

	const refreshList = () => {

	  axios
	    .get("https://osaka.o18s.com:9000/personGraphIRP/")
	    .then(res => {
			        setPiData(res.data.results);
			        const piLookup = {};
			        for(const pi of res.data.results) {
		               piLookup[pi.index] = pi.full_name;
		              }
	                setPiDict(piLookup);
		})
	    .catch(err => console.log(err));
	};


	return (
	  	<Container>

		  	<Box>
	        <Chip
	          label="Institutions"
	          icon={<AccountBalanceIcon />}
          	variant="outlined"
            onClick={()=> history.push('/sharestats/graphs')}
	        />
          <Chip
            label="Researchers"
            icon={<AccessibilityIcon />}
            variant="outlined"
            onClick={()=> history.push('/sharestats/graphs/researchers')}
          />
          <Chip
            label="IRP Researchers"
            icon={<AccessibilityIcon />}
          />
		  	</Box>

	      <Typography variant="h6">Data sharing by IRP Investigators</Typography>
			  <ScatterChart width={800} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
			  	<CartesianGrid strokeDasharray="3 3" />
			    <XAxis dataKey={'index'} type="number" name='Sorted Investigators' domain={[0,30]} unit=''>
			      <Label value="Sorted Investigators" offset={0} position="insideBottom" />
			    </XAxis>
			  	<YAxis dataKey={'data_score'} type="number" name='weight' domain={[0, 1]} unit=''
			  	       label={{ value: 'Estimated prop of papers with data statements', angle: -90, position: 'insideLeft' }}/>
			    <Scatter name='Investigators' data={piData} fill='#708090'/>
			  	<Tooltip cursor={{strokeDasharray: '3 3'}} content={<CustomTooltip piDict={piDict} />} />
		    </ScatterChart>

	  </Container>
	);


}

export default GraphResIRP;
