import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button, Paper, Grid, TextField} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import './CardSetList.css';

const ListContainer = styled(Container) ({
    flexGrow: 1,
});

const CardListGridItem = styled(Grid) ({
})

const CardListPaper = styled(Paper) ({
    textAlign: 'center',
    maxWidth: 500,
    padding: 15,
    backgroundColor: '#f7f7f7',
    color: '#26408B'
})



class CardSetList extends Component {
    state={
        idToEdit: '',
        newSetName: ''
    }

    // adds the pre-existing set to the user's repertoire
    handleAddExistingCardSet = (setId) => {
        this.props.dispatch({type: 'POST_ADD_EXISTING_CARD_SET_TO_REPERTOIRE', payload: setId});
    }

    // brings user to word list when clicking on a card set
    handleDisplayCardSetWords = (setId) => {
        this.props.history.push(`/card-set-words/${setId}`);
    }

    // toggles between set name and input for edit mode of card set
    handleEditMode = (setId, setName) => {
        this.state.idToEdit ?
        this.setState({
            idToEdit: "",
            newSetName: ""
        }):
        this.setState({
            idToEdit: setId,
            newSetName: setName
        })
    }

    // dispatches remove set saga when the delete is hit on a given card set
    handleRemoveCardSet = (setId) => {
        this.props.dispatch({type: 'REMOVE_CARD_SET_FROM_REPERTOIRE', payload: setId})
    }

    // runs a PUT route through SAGA, to update card set name
    handleUpdateSet = (setId) => {
        this.props.dispatch({type: 'UPDATE_CARD_SET_NAME', payload: {setId: setId, setName: this.state.newSetName}})
        this.setState({
            idToEdit: '',
            newSetName: ''
        })
    }

    render() {
        return (
            <>
                {/* renders users card sets on cardSets page */}
                <ListContainer maxWidth="lg">
                    <Grid container spacing={3} style={{marginTop: 20}}>
                    {this.props.newCardMode === true && 
                        <CardListGridItem item xs={12}>
                            <CardListPaper>
                                <div className="flex-container">
                                    <TextField
                                        style={{ margin: 0 }}
                                        label="New Card Set"
                                        margin="dense"
                                        variant="outlined"
                                        color="primary"
                                        // value={this.props.newCardSetInput}
                                        onChange={(event) => this.props.handleNewCardSetChange(event)}
                                    /> 
                                    <Button 
                                        color="primary" 
                                        variant="contained" 
                                        onClick={() => this.props.handleSubmitNewSet()}>Add Set
                                    </Button>
                                </div>
                            </CardListPaper>
                        </CardListGridItem>}
                        {this.props.listType === 'userSets' && this.props.cardSets.userCardSetsReducer[0] && 
                        this.props.cardSets.userCardSetsReducer.map(set =>
                            <CardListGridItem item xs={12} key={set.id}>
                                <CardListPaper> 
                                <div className="flex-container">
                                    <div style={{width: '85%'}}>
                                        {set.id === this.state.idToEdit ?
                                        <div className="flex-container">
                                        <TextField
                                        style={{ maxWidth: 150 }}
                                        label="New set name"
                                        margin="dense"
                                        variant="outlined"
                                        color="primary"
                                        value={this.state.newSetName}
                                        onChange={(event) => this.setState({newSetName: event.target.value})}
                                    /> 
                                    <Button 
                                        color="primary" 
                                        variant="contained" 
                                        onClick={() => this.handleUpdateSet(set.id)}
                                        >Change
                                    </Button>
                                    </div>:
                                        // Brings the user to the word list page of the chosen card set */ 
                                        <h3
                                        onClick={() => this.handleDisplayCardSetWords(set.id)}
                                        style={{height: "100%", width: "100%"}}
                                        >{set.name}</h3>}
                                    </div>
                                    {this.props.editMode && 
                                        <div className="flex-container" style={{width: '15%', justifyContent: 'space-between'}}>
                                            { // only renders the edit button for the creator of the set
                                            (set.creator_user_id == this.props.user.id) &&
                                            <EditRoundedIcon onClick={() => this.handleEditMode(set.id, set.name)}/>}
                                            <DeleteRoundedIcon onClick={() => this.handleRemoveCardSet(set.id)}/>
                                        </div>
                                    }
                                </div>
                                </CardListPaper>
                            </CardListGridItem>
                        )}
                    </Grid>
                </ListContainer>
                {/* renders users card sets on cardSets page */}
                {this.props.listType === 'inverseUserSets' && this.props.cardSets.inverseUserCardSetsReducer[0] && 
                <ListContainer maxWidth="lg">
                    <Grid container spacing={3} style={{marginTop: 20}}>
                        {this.props.cardSets.inverseUserCardSetsReducer.map(set =>
                            <CardListGridItem item xs={12} key={set.id}>
                                <CardListPaper
                                // Brings the user to the word list page of the chosen card set
                                onClick={() => this.handleAddExistingCardSet(set.id)}
                                ><h3>{set.name}</h3>
                                </CardListPaper>
                            </CardListGridItem>
                        )}
                    </Grid> 
                </ListContainer>}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default withRouter(connect(mapReduxStateToProps)(CardSetList));