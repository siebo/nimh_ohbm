import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory, Link  } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import FileCopyIcon from '@material-ui/icons/FileCopy';
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

	paper: {
	  marginTop: '24px',
	},

}));

function Researcher() {
  const {id} = useParams();
  const [papers, setPapers] = useState([]);
  const apiCall= "https://osaka.o18s.com:9000/projectpapers/".concat("?contact_pi_project_leader=", id)
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
  const classes = useStyles();
  return (
    <div className="App">

		<Typography variant="h4" gutterBottom>
		  {id}
		</Typography>

      <Box className={classes.paper}>
        { papers.map(paper => <div>
	          <Typography variant="h5" gutterBottom>{paper.title}</Typography>
	          <Typography variant="h6" gutterBottom>{paper.journal_title} - {paper.journal_year}</Typography>
	          <Chip
		        label={`DOI: ${paper.doi}`}
		        onClick={()=> window.open("https://doi.org/".concat("", paper.doi), "_blank")}
		        variant="outlined"
		      />
	          <Chip
		        label={`PMCID: ${paper.pmcid}`}
		        onClick={()=> window.open("https://www.ncbi.nlm.nih.gov/pmc/articles/PMC".concat("", paper.pmcid), "_blank")}
		        variant="outlined"
		      />
	          { paper.open_data == 'TRUE' ? <Chip size="small" label="Data sharing" icon={<DoneIcon />} color="primary"/>  : <Chip size="small" label="Data sharing" icon={<BlockIcon />} color="default"/>  }
              { paper.data_share == 'TRUE' ? <Chip size="small" label="Data reuse" icon={<DoneIcon />} color="primary"/>  : <Chip size="small" label="Data reuse" icon={<BlockIcon />} color="default"/>  }
	          <Link to={`/sharestats/papers/${paper.id}`}>
	            <Chip size="small" label="Edit" icon={<EditIcon />} color="secondary"/>
	          </Link>
          </div>
        )}
      </Box>

    </div>
  );
}

export default Researcher;
