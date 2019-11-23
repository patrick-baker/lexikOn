import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (
      <>
        <div className="bg">
          {/* <img src="/nikolay-vorobyev-jaH3QF46gAY-unsplash.jpg" alt="" /> */}
        </div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <div className="center-container">
          <h1 className="title"><b>LexikOn</b></h1>
          <h4>Practice your new words anywhere.</h4>
        </div>
        <form onSubmit={this.login}>
          <div>
            <TextField
              style={{ margin: 0 }}
              id="outlined-basic"
              label="Username"
              margin="normal"
              variant="filled"
              color="primary"
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
          <TextField
              style={{ margin: 0 }}
              id="outlined-basic"
              label="Password"
              margin="normal"
              type="password"
              variant="filled"
              color="primary"
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
          <Button 
            variant="contained" 
            color="primary" 
            className="log-in"
            type="submit"
            name="submit">
              Log In
          </Button>
          </div>
        </form>
        <center>
          <h6>Don't have a lexikOn account?</h6>
          <button
            type="button"
            className="link-button"
            onClick={() => { this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' }) }}
          >
            Register here
          </button>
        </center>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
