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
import LinkIcon from '@material-ui/icons/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

  table: {
    minWidth: 650,
  },

}));

function Article() {
  const {id} = useParams();
  const [papers, setPapers] = useState([]);
  const [dataShare, setDataShare] = useState("");
  const [dataReuse, setDataReuse] = useState("");
  const [notes, setNotes] = useState("");
  const apiCall = "https://osaka.o18s.com:9000/projectpapers/".concat("?id=", id)
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
            setDataShare(paper_list[0].data_share == 'TRUE' ? true : false);
            setDataReuse(paper_list[0].open_data == 'TRUE' ? true : false);
          })
        .catch(err => console.log(err));
  };
  const classes = useStyles();

  function handleSubmit(event) {
    alert('Your edits have been saved'.concat(" Share: ", dataShare));
    console.log(papers);
    console.log(dataShare);
    console.log(dataReuse);
    event.preventDefault();
  }

  function handleChangeDataShare(event) {
    setDataShare((prev) => !prev);
  }
  function handleChangeDataReuse(event) {
    setDataReuse((prev) => !prev);
  }
  function handleChangeNotes(event) {
    setNotes(event.target.value);
  }
  return (
    <div className="App">

      <Box className={classes.paper}>
        { papers.map(paper => <div>

        <Typography variant="h5" gutterBottom>Edit Data Policy: {paper.title}</Typography>
        <Typography variant="h6" gutterBottom>{paper.journal_title} - {paper.journal_year}</Typography>

          <Box>
            <Chip
              label="Pub Med"
              icon={<LinkIcon />}
              onClick={()=> window.open("https://www.ncbi.nlm.nih.gov/pmc/articles/PMC".concat("", paper.pmcid), "_blank")}
            />
            <Chip
              label="doi.org"
              icon={<LinkIcon />}
              onClick={()=> window.open("https://doi.org/".concat("", paper.doi), "_blank")}
            />
          </Box>

      <form onSubmit={handleSubmit}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>

                  <TableRow>
                    <TableCell align="right">Data sharing:</TableCell>
                    <TableCell align="left">
                      <Switch
                        checked={dataShare}
                        onChange={handleChangeDataShare}
                        color="primary"
                        name="dataShare"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">Data reuse:</TableCell>
                    <TableCell align="left">
                      <Switch
                        checked={dataReuse}
                        onChange={handleChangeDataReuse}
                        color="primary"
                        name="dataReuse"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right"></TableCell>
                    <TableCell align="left">
                      <TextField
                        id="filled-multiline-static"
                        label="Data Sharing Statement"
                        fullWidth
                        onChange={handleChangeNotes}
                        name="notes"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="filled"
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">
                      <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save
                      </Button>
                    </TableCell>
                    <TableCell align="left">

                    </TableCell>
                  </TableRow>

              </TableBody>
            </Table>
          </TableContainer>
      </form>

        </div>)}
      </Box>

    </div>
  );
}

export default Article;
