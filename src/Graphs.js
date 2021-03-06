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

  getOrgName(label) {
    return this.props.orgDict[label];
  }

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      console.log(payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{this.getOrgName(payload[0].value)}</p>
        </div>
      );
    }

    return null;
  }
};


function Graphs() {

	const [orgData, setOrgData] = useState("");
	const [orgDict, setOrgDict] = useState({});
	const history = useHistory();

	useEffect(() => {
	  refreshList();
	}, [])

	const refreshList = () => {
	  axios
	    .get("https://osaka.o18s.com:9000/orgGraph/")
	    .then(res => {
			        setOrgData(res.data.results);
			        const orgLookup = {};
			        for(const org of res.data.results) {
		               orgLookup[org.index] = org['organization_name'];
		              }
	                setOrgDict(orgLookup);

		  })
	    .catch(err => console.log(err));
	};




	return (
	  	<Container>

		  	<Box>
	        <Chip
	          label="Institutions"
	          icon={<AccountBalanceIcon />}
	        />
	          <Chip
	            label="Researchers"
	            icon={<AccessibilityIcon />}
	            variant="outlined"
	            onClick={()=> history.push('/sharestats/graphs/researchers')}
	          />
		  	</Box>

	      <Typography variant="h6">Most data sharing &amp; reuse comes from a small subset of NIMH funded Institutions</Typography>
			  <ScatterChart width={800} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
			  	<CartesianGrid strokeDasharray="3 3" />
			    <XAxis dataKey={'index'} type="number" name='Sorted Institution' domain={[0, 450]} unit=''>
			      <Label value="Sorted Institution (min 3 pubs)" offset={0} position="insideBottom" />
			    </XAxis>
			  	<YAxis dataKey={'data_score'} type="number" name='weight' domain={[0, 1]} unit=''
			  	       label={{ value: 'Estimated prop of papers with data statements', angle: -90, position: 'insideLeft' }}/>
			    <Scatter name='Institutions' data={orgData} fill='#708090'/>
			  	<Tooltip cursor={{strokeDasharray: '3 3'}} content={<CustomTooltip orgDict={orgDict} />} />
		    </ScatterChart>

	  </Container>
	);


}

export default Graphs;
