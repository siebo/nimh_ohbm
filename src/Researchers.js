import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDebounce } from "react-use";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function Researchers() {
  const [searchString, setSearchstring] = useState("");
  const [apiBase, setApiBase] = useState("https://osaka.o18s.com:9000/people/");
  const [apiCall, setApiCall] = useState("https://osaka.o18s.com:9000/people/");
  const [researchers, setResearchers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () => {
      axios
        .get(apiCall)
        .then(res => {
            const person_list = res.data.results;
            setResearchers(person_list);
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
          Search by Researcher
        </Typography>

        <TextField
          id="searchtext"
          label="Researcher Name"
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
        { researchers.map(researcher => <Link to={`/sharestats/researchers/${researcher.full_name}`}>
                            <ListItem button>
                              <ListItemText primary={researcher.full_name} />
                            </ListItem>
                          </Link>)}
      </List>
    </div>
  );

}

