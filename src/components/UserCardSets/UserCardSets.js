import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'; // components for working with modal if currently displayed word does not exist in DB
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CardSetList from '../CardSetList/CardSetList';
import './UserCardSets.css';
import Swal from 'sweetalert2';

class UserCardSets extends Component {

    state = {
        open: false, // local state for modal, upon add new card set click
        newCardMode: false, // switches to add new card set mode when true
        newCardSetInput: '' // input value for adding a new card set
    }

    componentDidMount() {
        this.setState({
            newCardMode: false, // enter correct home screen when home button is pressed
        })
    }

    handleDialogClose = () => {
        this.setState({ open: false }); // removes modal when user clicks off of it
    };

    handleNewCardSetChange = (event) => {
        console.log(this.state.newCardSetInput);
        this.setState({
            newCardSetInput: event.target.value
        })
    }

    handleEnterNewCardMode = () => {
        this.handleDialogClose();
        this.setState({
            newCardMode: true
        })
    }

    handleSubmitNewSet = () => {
        // if (this.props.cardSets.userCardSetsReducer.includes(this.state.newCardSetInput) ||  Attempt at avoiding card set name repeats
        // this.props.cardSets.inverseUserCardSetsReducer.includes(this.state.newCardSetInput)) {
        //      return Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: 'Something went wrong!',
        //         footer: '<a href>Why do I have this issue?</a>'
        //       })
        // } else {
            this.props.dispatch({type: 'POST_NEW_CARD_SET', payload: this.state.newCardSetInput});
            this.setState({
                newCardMode: false
            })
            Swal.fire(
                'The set has been added to your repertoire!',
                'Click on the set to add new words!',
                'success'
            )
        }
    // }

    render() {
        return (
            <div>
                {/* Conditional rendering of add and delete card set buttons if add new card mode is false */}
                {this.state.newCardMode === false && <div className="button-container"> 
                    {/* <AddCircleOutlineIcon onClick={() => this.setState({open: true})} fontSize='large' color='primary'></AddCircleOutlineIcon> */}
                    <Fab color="primary" aria-label="add set" onClick={() => this.setState({open: true})}>
                        <AddIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="delete set">
                        <DeleteIcon />
                    </Fab>
                </div>}
                {/* Card set list component for showing card set list on page */}
                <CardSetList 
                listType="userSets" 
                //below props sent down to render input and submit for adding a new card set
                newCardMode={this.state.newCardMode}
                newCardSetInput={this.state.newCardSetInput}
                handleNewCardSetChange = {this.handleNewCardSetChange}
                handleSubmitNewSet={this.handleSubmitNewSet}
                />
                {/* Modal dialog that shows when user presses the add new card button */}
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
                        <Button onClick={() => this.handleEnterNewCardMode()} color="primary">
                            No, I want to make my own.
                        </Button>
                        {/* Pressing yes should bring the user to a list of card sets that 
                        they do not have in their repertoire.*/}
                        <Button onClick={() => this.props.history.push('/inverse-card-sets')} color="primary" autoFocus>
                            Yes, use a finished set.
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(UserCardSets);