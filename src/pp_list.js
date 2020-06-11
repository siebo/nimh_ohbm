import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SocialButton from './SocialButton'

ReactDOM.render(
  <React.StrictMode>
    <Papers />
  </React.StrictMode>,
  document.getElementById('root')
);

const handleSocialLogin = (user) => {
  console.log(user)
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}
 
ReactDOM.render(
  <div>
    <SocialButton
      provider='google'
      appId='515002199508-1n4d00fma9to0sjolghkceheguu7ubfg.apps.googleusercontent.com'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Google
    </SocialButton>
  </div>,
  document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
