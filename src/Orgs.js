import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useDebounce } from "react-use";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function Orgs() {
  const [searchString, setSearchstring] = useState("");
  const [apiBase, apiCall] = useState("https://osaka.o18s.com:9000/orgs/");
  const [orgs, setResults] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    this.refreshList();
  }, [])

  const refreshList = () => {
      const apiCall = this.state.apiBase.concat("?search=", this.state.setSearchstring);
      console.log(apiCall);
      axios
        .get(apiCall)
        .then(res => {
            console.log(res.data.results);
            const orgs = res.data.results;
            this.setState({ orgs });
          })
        .catch(err => console.log(err));
  };

  const handleSearch = ({ currentTarget: { value } }) => {
    setSearchstring(value);
  };

  useDebounce(
    () => {
      console.log(searchString);
    },
    1000,
    [searchString]
  );

  return (
    <div className="App">

  		<Typography variant="h2" gutterBottom>
  		  Institutions
  		</Typography>

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
          value={searchString}
          onChange={handleSearch}
        />

      <ul>
        { this.state.orgs.map(org => <li>{org.organization_name}</li>)}
      </ul>
    </div>
  );

}
