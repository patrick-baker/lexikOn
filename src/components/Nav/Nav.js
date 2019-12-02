import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';

const Nav = (props) => (
  <div className="nav">
    <div className="nav-icons">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ?
        <HomeRoundedIcon fontSize="large"></HomeRoundedIcon> : 
        <LaunchRoundedIcon fontSize="large"></LaunchRoundedIcon>}
      </Link>
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
          <InfoRoundedIcon fontSize="large"></InfoRoundedIcon>
      </Link>
      {/* Show the link to the logout button if the user is logged in */}
      {props.user.id && (
            <LogOutButton style={{color: "white"}}/>
      )}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
