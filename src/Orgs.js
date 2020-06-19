import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useDebounce } from "react-use";
import { useHistory, Link } from "react-router-dom";


export default function Orgs() {
  const [searchString, setSearchstring] = useState("");
  const [apiBase, setApiBase] = useState("https://osaka.o18s.com:9000/orgs/");
  const [apiCall, setApiCall] = useState("https://osaka.o18s.com:9000/orgs/");
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () => {
      axios
        .get(apiCall)
        .then(res => {
            const org_list = res.data.results;
            setOrgs(org_list);
          })
        .catch(err => console.log(err));
  };

  const handleSearch = ({ currentTarget: { value } }) => {
    setSearchstring(value);
    setApiCall( apiBase.concat("?search=", value) );
  };

  useDebounce(
    () => {
      refreshList();
    },
    1000,
    [searchString]
  );

  return (
    <div className="App">

        <Typography variant="h2" gutterBottom>
          Search by Institution
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

      <List>
        { orgs.map(org => <Link to={`/sharestats/orgs/${org.organization_name}`}>
                            <ListItem button>
                              <ListItemText primary={org.organization_name} />
                            </ListItem>
                          </Link>)}
      </List>
    </div>
  );

}
