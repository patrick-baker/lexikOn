import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'; // components for working with modal if currently displayed word does not exist in DB
import { styled } from '@material-ui/core/styles';
import CardSetList from '../CardSetList/CardSetList';
import './UserCardSets.css';

const AddSetButton = styled(Button)({ // brings user to screen to add a new card set
    backgroundColor: 'green',
    borderRadius: 200,
    fontSize: 30,
});

const DeleteSetButton = styled(Button)({
    backgroundColor: 'red',
    borderRadius: 200,
    fontSize: 30,
})

class UserCardSets extends Component {

    state = {
        open: false, // local state for modal, upon add new card set click
        newCardMode: false, // switches to add new card set mode when true
        newCardSetInput: '' // input value for adding a new card set
    }

    handleDialogClose = () => {
        this.setState({ open: false }); // removes modal when user clicks off of it
    };


    render() {
        return (
            <>
                {/* Conditional rendering of add and delete card set buttons if add new card mode is false */}
                {this.state.newCardMode === false && <div className="button-container"> 
                    <AddSetButton onClick={() => this.setState({open: true})}>+</AddSetButton>
                    <DeleteSetButton>x</DeleteSetButton>
                </div>}
                {this.state.newCardMode === true && <input onChange={this.handleNewCardSetChange}></input>}
                <CardSetList listType="userSets"/>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Pre-existing word?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Would you like to use a pre-existing card set?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {/* Pressing No should bring the user to the create card set screen. */}
                        <Button onClick={this.handleDialogClose} color="primary">
                            No, I want to make my own.
                        </Button>
                        {/* Pressing yes should bring the user to a list of card sets that 
                        they do not have in their repertoire.*/}
                        <Button onClick={() => this.props.history.push('/inverse-card-sets')} color="primary" autoFocus>
                            Yes, use a finished set.
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(UserCardSets);