import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button, Paper, Grid, TextField} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import './CardSetList.css';

const ListContainer = styled(Container) ({
    flexGrow: 1,
});

const CardListGridItem = styled(Grid) ({
})

const CardListPaper = styled(Paper) ({
    textAlign: 'center',
    maxWidth: 500,
    padding: 20,
})



class CardSetList extends Component {

    // adds the pre-existing set to the user's repertoire
    handleAddExistingCardSet = (setId) => {
        this.props.dispatch({type: 'POST_ADD_EXISTING_CARD_SET_TO_REPERTOIRE', payload: setId});
    }

    handleDisplayCardSetWords = (id) => {
        this.props.history.push(`/card-set-words/${id}`);
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
                                        margin="normal"
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
                                <CardListPaper 
                                // Brings the user to the word list page of the chosen card set
                                onClick={() => this.handleDisplayCardSetWords(set.id)}
                                >{set.name}
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
                                >{set.name}
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