import React from 'react';
import './App.css';
import Welcome from './Welcome';
import Papers from './Papers';
import GoogleBtn from './GoogleBtn';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();
  return (
    <div className="App">

      <Router>
        <div>

          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/sharestats">Home</Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                  <Link to="/sharestats/papers">Papers</Link>
                </Typography>
                <GoogleBtn/>
              </Toolbar>
            </AppBar>
          </div>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/sharestats/papers">
              <Papers />
            </Route>
            <Route path="/sharestats">
              <Welcome />
            </Route>
          </Switch>

        </div>
      </Router>

    </div>
  );
}

export default App;
