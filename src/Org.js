import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory  } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import LinkIcon from '@material-ui/icons/Link';
import Paper from '@material-ui/core/Paper';
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },

  paper: {
      marginTop: '24px',
    },
  },
}));

function Org() {
  const {id} = useParams();
  const [papers, setPapers] = useState([]);
  const [orgName, setOrgName] = useState("");
  const apiCall = "https://osaka.o18s.com:9000/orgArticles/".concat("?org_id=", id)
  const history = useHistory();

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () => {
      axios
        .get(apiCall)
        .then(res => {
            setOrgName(res.data.results[0].organization_name);
            const paper_list = res.data.results;
            setPapers(paper_list);
          })
        .catch(err => console.log(err));
  };
  const classes = useStyles();
  return (
    <div className="App">

		<Typography variant="h4" gutterBottom>
		  {orgName}
		</Typography>

      <Box className={classes.paper}>
        { papers.map(paper => <Paper fullWidth>
          <Typography variant="h5">{paper.title}</Typography>
          <Typography variant="h6" gutterBottom>{paper.journal_title} - {paper.journal_year}</Typography>
          <Box>
            <Chip
              label="Pub Med"
              icon={<LinkIcon />}
              onClick={()=> window.open("https://www.ncbi.nlm.nih.gov/pmc/articles/PMC".concat("", paper.pmcid), "_blank")}
            />

            <CopyToClipboard text={paper.pmcid}>
              <Chip
                label={`PMCID: ${paper.pmcid}`}
                icon={<FileCopyIcon />}
                variant="outlined"
              />
            </CopyToClipboard>
            <Chip
              label="doi.org"
              icon={<LinkIcon />}
              onClick={()=> window.open("https://doi.org/".concat("", paper.doi), "_blank")}
            />
            <CopyToClipboard text={paper.doi}>
  	          <Chip
    		        label={`DOI: ${paper.doi}`}
                icon={<FileCopyIcon />}
    		        variant="outlined"
    		      />
            </CopyToClipboard>
	        </Box>
	      { paper.data_share == 'TRUE' ? <Chip size="small" label="Data sharing" icon={<DoneIcon />} color="primary"/>  : <Chip size="small" label="Data sharing" icon={<BlockIcon />} color="secondary"/>  }
	      { paper.open_data == 'TRUE' ? <Chip size="small" label="Data reuse" icon={<DoneIcon />} color="primary"/>  : <Chip size="small" label="Data reuse" icon={<BlockIcon />} color="secondary"/>  }
            <Chip size="small" 
                  onClick={()=> history.push(`/sharestats/papers/${paper.pmcid}`)}
                  label="edit"
                  icon={<EditIcon />} 
                  variant="outlined"
            />
          </Paper>
        )}
      </Box>

    </div>
  );
}

export default Org;
