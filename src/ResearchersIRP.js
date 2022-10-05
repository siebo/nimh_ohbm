import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import GradeIcon from '@material-ui/icons/Grade';
import DescriptionIcon from '@material-ui/icons/Description';
import { useDebounce } from "react-use";
import { useHistory, Link } from "react-router-dom";


export default function ResearchersIRP() {
  const [searchString, setSearchstring] = useState("");
  const [apiBase, setApiBase] = useState("https://osaka.o18s.com:9000/people-irp/");
  const [apiCall, setApiCall] = useState("https://osaka.o18s.com:9000/people-irp/");
  const [researchers, setResearchers] = useState([]);

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

  const piList = {
    maxWidth:'600px'
  };

  return (
    <div className="App">

        <Typography variant="h2" gutterBottom>
          IRP Researchers
        </Typography>

      <List style={piList}>
        { researchers.map(researcher => <Link to={`/sharestats/researchers/${researcher.id}`}>
                            <ListItem button>
                              <ListItemText primary={researcher.full_name} />
                              <Chip
                                label={researcher.count_total_pubs}
                                icon={<DescriptionIcon />}
                              />
                              <Chip
                                label={researcher.data_score.toFixed(3)}
                                icon={<GradeIcon />}
                              />
                            </ListItem>
                          </Link>)}
      </List>
    </div>
  );

}
