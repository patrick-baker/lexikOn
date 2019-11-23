import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import LaunchRoundedIcon from '@material-ui/icons/LaunchRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    {props.user.id &&
    <div className="nav-title">
    <Link to="/home">
      <h2>lexikOn</h2>
    </Link>
    </div>}
    <div className="nav-icons">
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ?
        <HomeRoundedIcon></HomeRoundedIcon> : 
        <LaunchRoundedIcon></LaunchRoundedIcon>}
      </Link>
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
          <InfoRoundedIcon></InfoRoundedIcon>
      </Link>
      {/* Show the link to the logout button if the user is logged in */}
      {props.user.id && (
        <>
          {/* Links that are no longer needed */}
          {/* <Link className="nav-link" to="/info">
            Info
          </Link> */}
          {/* <Link className="nav-link" to="/add-word">
            Add New Word
          </Link> 
          <Link className="nav-link" to="/card-sets">
            Your Card Sets
          </Link>
          <Link className="nav-link" to="/inverse-card-sets">
            Add a Pre-existing Set
          </Link> */}
          <LogOutButton className="nav-link"/>
        </>
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
