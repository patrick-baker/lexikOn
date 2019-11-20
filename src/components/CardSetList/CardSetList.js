import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const ListContainer = styled(Container) ({

});

class CardSetList extends Component {

    // adds the pre-existing set to the user's repertoire
    handleAddExistingCardSet = (setId) => {
        this.props.dispatch({type: 'POST_ADD_EXISTING_CARD_SET_TO_REPERTOIRE', payload: setId});
    }

    render() {
        return (
            <>
                {this.props.listType === 'userSets' && this.props.cardSets.userCardSetsReducer[0] && // renders users card sets on cardSets page
                <ListContainer maxWidth="lg">
                {this.props.cardSets.userCardSetsReducer.map(set => 
                    <p key={set.id}>{set.name}</p>)}
                </ListContainer>}
                {this.props.listType === 'inverseUserSets' && this.props.cardSets.inverseUserCardSetsReducer[0] && // renders users card sets on cardSets page
                <ListContainer maxWidth="lg">
                {this.props.cardSets.inverseUserCardSetsReducer.map(set => 
                    <p key={set.id}
                    onClick={() => this.handleAddExistingCardSet(set.id)}
                    >{set.name}</p>)}
                </ListContainer>}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(CardSetList);