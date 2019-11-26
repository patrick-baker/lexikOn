import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'; // components for working with modal if currently displayed word does not exist in DB

class Modal extends Component {

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby={this.props.ariaLabelledBy}
                aria-describedby={this.props.ariaDescribedBy}
            >
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.description}
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleAddExistingWord} color="primary">
                        Agree
                        </Button>
                    {/* Pressing agree should add the preexisting word to the card set, 
                        Post request to cards_words junction table */}
                    <Button onClick={this.props.handleClose} color="primary" autoFocus>
                        Disagree
                        </Button>
                </DialogActions>
            </Dialog>

        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(Modal);