import React from 'react';
import './App.css';
import axios from "axios";
import Typography from '@material-ui/core/Typography';

class Orgs extends React.Component {

    constructor(props) {
    super(props);

    this.state = {
      orgs: [],
    };

  }

  componentDidMount() {
      this.refreshList();
  }

  refreshList = () => {
      axios
        .get("https://osaka.o18s.com:9000/orgs/")
        .then(res => {
            console.log(res.data.results);
            const persons = res.data.results;
            this.setState({ persons });
          })
        .catch(err => console.log(err));
  };

  render() {
  return (
    <div className="App">

  		<Typography variant="h2" gutterBottom>
  		  Institutions
  		</Typography>

      <ul>
        { this.state.orgs.map(org => <li>{org.organization_name}</li>)}
      </ul>
    </div>
  );
  }
}

export default Orgs;
