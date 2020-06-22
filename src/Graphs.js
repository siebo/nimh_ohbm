import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label} from "recharts"


function Graphs() {

	const [apiData, setApiData] = useState("");

	useEffect(() => {
	refreshList();
	}, [])

	const refreshList = () => {
	  axios
	    .get("https://osaka.o18s.com:9000/orgGraph/")
	    .then(res => {
			        setApiData(res.data.results);
			        })
	    .catch(err => console.log(err));
	};


	  return (
	  	<div>
        <Typography variant="h6">Most data sharing &amp; reuse comes from a small subset of NIMH funded Institutions</Typography>
		<ScatterChart width={800} height={600} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
	  	<CartesianGrid />
	    <XAxis dataKey={'index'} type="number" name='Sorted Institution' range={[0, 450]} unit=''>
	      <Label value="Sorted Institution (min 3 pubs)" offset={0} position="insideBottom" />
	    </XAxis>
	  	<YAxis dataKey={'data_score'} type="number" name='weight' range={[0, .9]} unit=''
	  	       label={{ value: 'Estimated prop of papers with data policy', angle: -90, position: 'insideLeft' }}/>
	    <Scatter name='Institutions' data={apiData} fill='#8884d8'/>
	  	<Tooltip cursor={{strokeDasharray: '3 3'}}/>
	  </ScatterChart>
	  </div>
	);


	}

export default Graphs;
