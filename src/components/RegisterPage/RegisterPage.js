import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

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
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <div className="center-container">
          <h1 className="title"><b>LexikOn</b></h1>
          <h4>Practice your new words anywhere.</h4>
        </div>
        <form onSubmit={this.registerUser}>
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
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
          <Button 
            variant="contained" 
            color="primary" 
            className="register"
            type="submit"
            name="submit">
              Register
          </Button>
          </div>
        </form>
        <center>
          <h6>Back to login.</h6>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
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

export default connect(mapStateToProps)(RegisterPage);

