import React, { useState, useEffect } from 'react';
import './App.css';
import Typography from '@material-ui/core/Typography';
import { useParams, useHistory  } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import LinkIcon from '@material-ui/icons/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSelector } from "react-redux";
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
  const user = useSelector(({ user }) => user);
  const apiCall = "https://osaka.o18s.com:9000/articles/".concat("?pmcid=", id)

  useEffect(() => {
    refreshList();
  }, [])

  const refreshList = () => {
      axios
        .get(apiCall)
        .then(res => {
            const paper_list = res.data.results;
            setPapers(paper_list);
            setDataShare(paper_list[0].int_data_share == 1 ? true : false);
            setDataReuse(paper_list[0].int_open_data == 1 ? true : false);
          })
        .catch(err => console.log(err));
  };
  const classes = useStyles();

  function handleSubmit(event) {
    axios.post('https://osaka.o18s.com:9000/articleupdates/', {
                pmcid: id,
                open_data: dataReuse == true ? "TRUE" : "FALSE",
                data_share: dataShare == true ? "TRUE" : "FALSE",
                data_statement: notes,
                is_merged: false,
                edit_user: user.email
              })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
    });
    alert('Your changes have been added to our review queue.');
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

        <Typography variant="h4" gutterBottom>Edit Data Policy:</Typography>
        <Typography variant="h5" gutterBottom>{paper.title}</Typography>
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
                        helperText="Please copy and paste the sentence(s) from the PMC version of the paper that indicate the paper provided or made use of shared data"
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
