import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const ListContainer = styled(Container) ({

});

class WordsList extends Component {
    // the title of the chosen card set
    state = {
        setTitle: ''
    }

    componentDidMount() {
        const setId = this.props.match.params.id;
        this.props.dispatch({type:'FETCH_CARD_SET_WORDS', payload: setId})
    }

    // allows the set creator to edit it, and prevents all others from doing so
    handleAddWordToCardSet = (setId) => {
        // makes sure that the user card set reducer is up to date
        this.props.dispatch({type: 'FETCH_USER_CARD_SETS'}); 
        // filters the correct card set out of userCardSetReducers, to check if the user is the creator
        const thisCardSet = this.props.cardSets.userCardSetsReducer.filter(set => set.id == setId);
        // check whether the current user is the creator of the card set
        if (thisCardSet[0].creator_user_id == this.props.user.id) {
        // brings the user to the add word page, with setId as props so word can be added to this card set
            this.props.history.push(`/add-word/${this.props.match.params.id}`)
        } else {
            alert('You are not the creator!');
        }
    }

    render() {
        return (
            <>
                {/* Puts the card set title on the screen */}
                <h1 onClick={() => this.handleAddWordToCardSet(this.props.match.params.id)}>{this.props.words.cardSetWordsReducer[0] && this.props.words.cardSetWordsReducer[0].set_name}</h1>
                {/* Maps through the cardSetWordsReducer to display the words on the screen. */}
                {this.props.words.cardSetWordsReducer.map(word => <div><h3>{word.english_entry}</h3></div>)}
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(WordsList);