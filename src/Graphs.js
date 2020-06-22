import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts"


function Graphs() {

	const [orgData, setOrgData] = useState("");
	const [piData, setPiData] = useState("");

	useEffect(() => {
	  refreshList();
	}, [])

	const refreshList = () => {
	  axios
	    .get("https://osaka.o18s.com:9000/orgGraph/")
	    .then(res => {
			        setOrgData(res.data.results);
			        })
	    .catch(err => console.log(err));
	  axios
	    .get("https://osaka.o18s.com:9000/personGraph/")
	    .then(res => {
			        setPiData(res.data.results);
			        })
	    .catch(err => console.log(err));
	};


	return (
	  	<div>

	      <Typography variant="h6">Most data sharing &amp; reuse comes from a small subset of NIMH funded Institutions</Typography>
			  <ScatterChart width={800} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
			  	<CartesianGrid strokeDasharray="3 3" />
			    <XAxis dataKey={'index'} type="number" name='Sorted Institution' domain={[0, 450]} unit=''>
			      <Label value="Sorted Institution (min 3 pubs)" offset={0} position="insideBottom" />
			    </XAxis>
			  	<YAxis dataKey={'data_score'} type="number" name='weight' domain={[0, 1]} unit=''
			  	       label={{ value: 'Estimated prop of papers with data policy', angle: -90, position: 'insideLeft' }}/>
			    <Scatter name='Institutions' data={orgData} fill='#708090'/>
			  	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
		    </ScatterChart>

	      <Typography variant="h6">Most data sharing &amp; reuse comes from a small subset of NIMH funded Investigators</Typography>
			  <ScatterChart width={800} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
			  	<CartesianGrid strokeDasharray="3 3" />
			    <XAxis dataKey={'index'} type="number" name='Sorted Investigators' domain={[0,4200]} unit=''>
			      <Label value="Sorted Investigators (min 3 pubs)" offset={0} position="insideBottom" />
			    </XAxis>
			  	<YAxis dataKey={'data_score'} type="number" name='weight' domain={[0, 1]} unit=''
			  	       label={{ value: 'Estimated prop of papers with data policy', angle: -90, position: 'insideLeft' }}/>
			    <Scatter name='Institutions' data={piData} fill='#708090'/>
			  	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
		    </ScatterChart>

	  </div>
	);


}

export default Graphs;
