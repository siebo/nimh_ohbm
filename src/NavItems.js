import React from 'react';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PollIcon from '@material-ui/icons/Poll';
import HomeIcon from '@material-ui/icons/Home';

function NavItems() {

  const history = useHistory();

  function linkHome() {
    history.push("/sharestats");
  };
  function linkPIs() {
    history.push("/sharestats/papers");
  };
  function linkOrgs() {
    history.push("/sharestats/papers");
  };
  function linkGraphs() {
    history.push("/sharestats/graphs");
  };

    return (
      <List>
        <ListItem button key="Home" onClick={linkHome}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button key="Graphs" onClick={linkGraphs}>
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText primary="Graphs" />
        </ListItem>
        <ListItem button key="Institutions" onClick={linkOrgs}>
          <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
          <ListItemText primary="Institutions" />
        </ListItem>
        <ListItem button key="PIs" onClick={linkPIs}>
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText primary="PIs" />
        </ListItem>
      </List>
    );

}

export default NavItems;