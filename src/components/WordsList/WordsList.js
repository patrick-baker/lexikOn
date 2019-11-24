import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';
// import InfoIcon from '@material-ui/icons/Info';
import { styled } from '@material-ui/core/styles';

const WordsListContainer = styled(Container) ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper
});

const WordsGridList = styled(GridList) ({
    width: 500,
    height: 450,
});

// const WordsIconButton = styled(IconButton) ({
//     color: 'rgba(255, 255, 255, 0.54)'
// })

class WordsList extends Component {
    // the title of the chosen card set
    state = {
        setTitle: ''
    }

    componentDidMount() {
        const setId = this.props.match.params.id;
        this.props.dispatch({type:'FETCH_CARD_SET_WORDS', payload: setId})
        console.log('count');
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
            <div style={{textAlign: "center"}}>
                {/* Puts the card set title on the screen */}
                <h1 onClick={() => this.handleAddWordToCardSet(this.props.match.params.id)}>{this.props.words.cardSetWordsReducer[0] && this.props.words.cardSetWordsReducer[0].set_name}</h1>
                {/* Maps through the cardSetWordsReducer to display the words on the screen. */} 
                <WordsListContainer>
                <WordsGridList cellHeight={180}>
                  {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                  </GridListTile> */}
                  {this.props.words.cardSetWordsReducer.map(word => (
                    <GridListTile key={word.word_id}>
                      <img src={word.image_url} alt={word.english_entry} />
                      <GridListTileBar
                        title={word.english_entry}
                        subtitle={word.russian_entry}
                        // actionIcon={
                        //   <WordsIconButton aria-label={`info about ${word.english_entry}`}>
                        //     <InfoIcon />
                        //   </WordsIconButton>
                        // }
                      />
                    </GridListTile>
                  ))}
                </WordsGridList>
              </WordsListContainer>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(WordsList);