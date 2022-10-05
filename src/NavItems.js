import React from 'react';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import HomeIcon from '@material-ui/icons/Home';

function NavItems() {

  const history = useHistory();

  function linkHome() {
    history.push("/sharestats");
  };
  function linkPIs() {
    history.push("/sharestats/researchers");
  };
  function linkPIsIRP() {
    history.push("/sharestats/irp-researchers");
  };
  function linkOrgs() {
    history.push("/sharestats/orgs");
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
          <ListItemIcon><AssessmentOutlinedIcon /></ListItemIcon>
          <ListItemText primary="Graphs" />
        </ListItem>
        <ListItem button key="Institutions" onClick={linkOrgs}>
          <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
          <ListItemText primary="Institutions" />
        </ListItem>
        <ListItem button key="Researchers" onClick={linkPIs}>
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText primary="Researchers" />
        </ListItem>
        <ListItem button key="ResearchersIRP" onClick={linkPIsIRP}>
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText primary="IRP Researchers" />
        </ListItem>
      </List>
    );

}

export default NavItems;
