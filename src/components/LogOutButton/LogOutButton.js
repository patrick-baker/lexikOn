import React from 'react';
import { connect } from 'react-redux';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

const LogOutButton = props => (
  <button className="nav-link" 
    onClick={() => props.dispatch({ type: 'LOGOUT' })}
  >
    <ExitToAppRoundedIcon style={{color: 'white'}} fontSize="large"></ExitToAppRoundedIcon>
  </button>
);

// This component doesn't need 'mapStateToProps'
// because it doesn't care what the current state is.
// No matter what the redux state is, this button will always be a log out button
// this component still needs 'connect' though, because it is going to dispatch a redux action
export default connect()(LogOutButton);
