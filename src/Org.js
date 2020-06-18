import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory, Link  } from 'react-router-dom'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function Org() {
  const {id} = useParams();
  const [papers, setPapers] = useState([]);
  const apiCall= "https://osaka.o18s.com:9000/projectpapers/".concat("?organization_name=", id)
  const history = useHistory();

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () => {
      axios
        .get(apiCall)
        .then(res => {
            const paper_list = res.data.results;
            setPapers(paper_list);
          })
        .catch(err => console.log(err));
  };
  return (
    <div className="App">

		<Typography variant="h2" gutterBottom>
		  {id}
		</Typography>

      <div>
        { papers.map(paper => <div>
	          <Typography variant="h5" gutterBottom>{paper.title}</Typography>
	          <Typography variant="h6" gutterBottom>{paper.journal_title} - {paper.journal_year}</Typography>
	          { paper.open_data == 'TRUE' ? <Chip size="small" label="Data sharing" color="primary"/>  : <Chip size="small" label="Data sharing" color="secondary"/>  }
              { paper.data_share == 'TRUE' ? <Chip size="small" label="Data reuse" color="primary"/>  : <Chip size="small" label="Data reuse" color="secondary"/>  }
              <Divider />
          </div>
        )}
      </div>

    </div>
  );
}

export default Org;
