import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button, Paper, Grid} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

const ListContainer = styled(Container) ({
    flexGrow: 1,
});

const CardListPaper = styled(Paper) ({
    textAlign: 'center',
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
                {this.props.listType === 'userSets' && this.props.cardSets.userCardSetsReducer[0] && 
                <ListContainer maxWidth="lg">
                    <Grid container spacing={3}>
                        {this.props.cardSets.userCardSetsReducer.map(set => 
                            <Grid item xs={12}>
                                <CardListPaper key={set.id} 
                                // Brings the user to the word list page of the chosen card set
                                onClick={() => this.handleDisplayCardSetWords(set.id)}
                                >{set.name}
                                </CardListPaper>
                            </Grid>
                        )}
                    </Grid>
                </ListContainer>}
                {/* renders users card sets on cardSets page */}
                {this.props.listType === 'inverseUserSets' && this.props.cardSets.inverseUserCardSetsReducer[0] && 
                <ListContainer maxWidth="lg">
                    <Grid container spacing={3}>
                        {this.props.cardSets.inverseUserCardSetsReducer.map(set =>
                            <Grid item xs={12}>
                                <CardListPaper key={set.id} 
                                // Brings the user to the word list page of the chosen card set
                                onClick={() => this.handleAddExistingCardSet(set.id)}
                                >{set.name}
                                </CardListPaper>
                            </Grid>
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