import React from 'react';
import { useHistory } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import BuildIcon from '@material-ui/icons/Build';
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
        <ListItem button key="ResearchersIRP" onClick={linkPIsIRP}>
          <ListItemIcon><AccessibilityIcon /></ListItemIcon>
          <ListItemText primary="IRP Researchers" />
        </ListItem>

        <ListItem button key="Publications">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Publications" />
        </ListItem>
        <ListItem button key="NIDBReports">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="NIDB Reports" />
        </ListItem>
        <ListItem button key="NCTProtocols">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="NCT Protocols" />
        </ListItem>
        <ListItem button key="DSMPs">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="DSMPs" />
        </ListItem>
        <ListItem button key="DataSharingObjects">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Data Sharing Objects" />
        </ListItem>

      </List>
    );

}

export default NavItems;
