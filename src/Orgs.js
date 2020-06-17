import React from 'react';
import './App.css';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { useDebounce } from "react-use";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Orgs() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);

  componentDidMount() {
      this.refreshList();
  }

  refreshList = () => {
      axios
        .get("https://osaka.o18s.com:9000/orgs/")
        .then(res => {
            console.log(res.data.results);
            const orgs = res.data.results;
            this.setState({ orgs });
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
