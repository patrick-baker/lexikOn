import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CardSetList from '../CardSetList/CardSetList';
import './UserCardSets.css';
import Swal from 'sweetalert2';
import Modal from '../Modal/Modal';
import SnackBar from '../MySnackBar/MySnackBar';

class UserCardSets extends Component {

    state = {
        open: false, // local state for modal, upon add new card set click
        newCardMode: false, // switches to add new card set mode when true
        newCardSetInput: '', // input value for adding a new card set
        editMode: false, // edit mode for changing name of, or removing, set
        snackBarOpen: false // the snackbar success message that opens when new word is added
    }

    componentDidMount() {
        this.setState({
            newCardMode: false, // enter correct home screen when home button is pressed
        })
    }

    handleClose = () => {
        this.setState({ open: false }); // removes modal when user clicks off of it
    };

    handleNewCardSetChange = (event) => {
        console.log(this.state.newCardSetInput);
        this.setState({
            newCardSetInput: event.target.value
        })
    }

    toggleNewCardMode = () => {
        this.state.newCardMode ?
        this.setState({
            newCardMode: false
        }) :
        this.setState({
            newCardMode: true
        })
        this.handleClose();
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
            // success snackbar appears after set addition
            this.handleSnackBar();
        }
    // }

    // toggles edit mode for editing card set
    toggleEditMode = () => {
        this.state.editMode ? 
        this.setState ({
            editMode: false
        }) :
        this.setState({
            editMode: true
        })
    }

    // toggle display of snackbar, opens when word successfully added
    handleSnackBar = () => {
        this.state.snackBarOpen ?
        this.setState({
           snackBarOpen: false 
        }):
        this.setState({
            snackBarOpen: true
        })
    }

    render() {
        return (
            <div>
                {/* Conditional rendering of add and delete card set buttons if add new card mode is false */}
                {this.state.newCardMode === false && <div className="button-container"> 
                    <Fab color="primary" aria-label="add set" onClick={() => this.setState({open: true})}>
                        <AddIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="delete set">
                        <EditIcon style={{color: 'white'}} onClick={() => this.toggleEditMode()}/>
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
                editMode={this.state.editMode}
                toggleEditMode={this.toggleEditMode}
                toggleNewCardMode={this.toggleNewCardMode}
                />
                {/* Modal dialog that shows when user presses the add new card set button */}
                <Modal 
                open={this.state.open}
                handleClose={this.handleClose}
                ariaLabelledBy="alert for adding a card set"
                ariaDescribedBy="this alert pops up when a user attempts to add a card set, 
                allowing them to use preexisting or new set"
                title="Add a new Card Set!"
                description="Would you like to use a pre-existing card set?"
                // Pressing yes should bring the user to a list of card sets that 
                        //they do not have in their repertoire.
                agreeFunction={() => this.props.history.push('/inverse-card-sets')}
                // Pressing No should bring the user to the create card set screen. 
                disagreeFunction={this.toggleNewCardMode}
                agreeText="Yes, use a finished set."
                disagreeText="No, I want to make my own."        
                />
                <SnackBar
                snackBarOpen={this.state.snackBarOpen}
                handleSnackBar={this.handleSnackBar}
                message="Set Successfully Added!"
                />
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(UserCardSets);