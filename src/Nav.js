import React from 'react';
import SocialButton from './SocialButton'

const handleSocialLogin = (user) => {
  console.log(user);
}
 
const handleSocialLoginFailure = (err) => {
  console.error(err);
}

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    this.state = {username: ''};
  }

  render() {
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
  </div>
    );
  }
}

export default Nav;