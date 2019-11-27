import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  success: {
    backgroundColor: '#81B1D5'
  },
  close: {
    padding: theme.spacing(1/2),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

class SimpleSnackbar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          className={classes.success}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.snackBarOpen}
          autoHideDuration={1500}
          onClose={this.props.handleSnackBar}
          TransitionComponent={Fade}
        >
        <SnackbarContent
          className={classes.success}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <CheckCircleIcon className={classes.icon} />
              {this.props.message}
        </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.props.handleSnackBar}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        </Snackbar>
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSnackbar);