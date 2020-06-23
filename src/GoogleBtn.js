import React, { Component, useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector, connect } from "react-redux";

import {} from "react-router";
import { login, logout } from "./store/actions/user";

function GoogleBtn() {

  const CLIENT_ID = '515002199508-1n4d00fma9to0sjolghkceheguu7ubfg.apps.googleusercontent.com';
  const dispatch = useDispatch();
  const [isAuthed, setIsAuthed] = useState(0);

  function handleLogin (response) {
    console.log('doing login');
    if(response.accessToken)
      setIsAuthed(1);
      dispatch(login({
        isAuthed: true,
        fullname: response.profileObj.name,
        email: response.profileObj.email
      }))
  }

  function handleLogout (response) {
      console.log('doing login');
      setIsAuthed(1);
      dispatch(logout({
        isAuthed: false,
        fullname: '',
        email: ''
      }))
  }

  function handleLoginFailure (response) {
    alert('Failed to log in')
  }

  function handleLogoutFailure (response) {
    alert('Failed to log out')
  }


    return (
    <div>
      { isAuthed ?
        <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ handleLogout }
          onFailure={ handleLogoutFailure }
        >
        </GoogleLogout>: <GoogleLogin
          clientId={CLIENT_ID}
          buttonText='Login'
          onSuccess={ handleLogin }
          onFailure={ handleLoginFailure }
          cookiePolicy={ 'single_host_origin' }
          responseType='code,token'
        />
      }
    </div>
    );

}

export default GoogleBtn;
