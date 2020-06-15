import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';


const CLIENT_ID = '515002199508-1n4d00fma9to0sjolghkceheguu7ubfg.apps.googleusercontent.com';


class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggeded: false,
      accessToken: '',
      fullname: '',
      email: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.accessToken){
      this.setState(state => ({
        isLoggeded: true,
        accessToken: response.accessToken,
        fullname: response.Tt.Bd,
        email: response.Tt.Du
      }));
    }
  }

  logout (response) {
    this.setState(state => ({
      isLoggeded: false,
      accessToken: '',
      fullname: '',
      email: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLoggeded ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
      { this.state.accessToken ? <h5>{ this.state.fullname }</h5> : null }

    </div>
    )
  }
}

export default GoogleBtn;
