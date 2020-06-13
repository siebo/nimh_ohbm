import React from 'react';
import ReactDOM from 'react-dom';
import SocialButton from './SocialButton'


const handleSocialLogin = (user) => {
  console.log(user)
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err)
}


function Nav() {
  return (
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
  );
}
