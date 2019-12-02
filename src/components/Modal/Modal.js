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
                style={{textAlign: 'center'}}
            >
                <DialogTitle style={{color: '#26408B'}}>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{color: '#26408B'}}>
                        {this.props.description}
                        </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.agreeFunction} color="primary" variant="contained">
                        {this.props.agreeText}
                        </Button>
                    {/* Pressing agree should add the preexisting word to the card set, 
                        Post request to cards_words junction table */}
                    <Button onClick={this.props.disagreeFunction} color="primary" variant="contained" autoFocus>
                        {this.props.disagreeText}
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