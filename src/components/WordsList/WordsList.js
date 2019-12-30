import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Paper, Container, Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import WordsGrid from '../WordsGrid/WordsGrid';
import Media from 'react-media';

const CardListPaper = styled(Paper)({
  textAlign: 'center',
  maxWidth: 500,
  padding: 15,
  backgroundColor: '#f7f7f7',
  color: '#26408B',
  margin: 'auto'
})

class WordsList extends Component {
  // the title of the chosen card set
  state = {
    removeWordMode: false
  }

  // fetches card set's words from database on component mount
  componentDidMount() {
    const setId = this.props.match.params.id;
    this.props.dispatch({ type: 'FETCH_CARD_SET_WORDS', payload: setId })
    console.log('count');
  }

  // empties word reducer on page unmount, so correct words render when card set is entered next
  componentWillUnmount() {
    this.props.dispatch({ type: 'GET_CARD_SET_WORDS', payload: [] });
  }

  // allows the set creator to edit it, and prevents all others from doing so
  handleAddWordToCardSet = (setId) => {
    // makes sure that the user card set reducer is up to date
    this.props.dispatch({ type: 'FETCH_USER_CARD_SETS' });
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

  handleRemoveWordMode = () => {
    this.state.removeWordMode ?
      this.setState({
        removeWordMode: false
      }) :
      this.setState({
        removeWordMode: true
      })
  }

  handleRemoveWord = (wordInSetId) => {
    const setId = this.props.match.params.id;
    // removes chosen word from current set by removing the junction table entry
    this.props.dispatch({
      type: 'REMOVE_WORD_FROM_SET', payload: {
        wordInSetId: wordInSetId,
        setId: setId
      }
    });
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {/* Puts the card set title on the screen */}
        <Container>
          <Grid item xs={12} style={{ marginTop: 10, marginBottom: 20 }}>
            <CardListPaper>
              <div className="flex-container">
                <div style={{ width: '85%' }}>
                  <h3>{this.props.words.cardSetWordsReducer[0] && this.props.words.cardSetWordsReducer[0].set_name}</h3>
                </div>
                {// only renders the delete word mode button and add word button for the creator of the set
                  (this.props.words.cardSetWordsReducer[0] &&
                    this.props.words.cardSetWordsReducer[0].creator_user_id == this.props.user.id) &&
                  <div className="flex-container" style={{ width: '15%', justifyContent: 'space-between' }}>
                    <AddRoundedIcon onClick={() => this.handleAddWordToCardSet(this.props.match.params.id)} />
                    <ClearRoundedIcon onClick={() => this.handleRemoveWordMode()} />
                  </div>}
              </div>
            </CardListPaper>
          </Grid>
          {/* Renders the follow directions depending on whether the user was the set creator. */}
          {(this.props.words.cardSetWordsReducer[0] &&
            this.props.words.cardSetWordsReducer[0].creator_user_id == this.props.user.id) ?
            <h3 style={{marginBottom: '10px'}}>You are the set creator. Feel free to review or edit this set.</h3> : 
            <h3 style={{marginBottom: '10px'}}>You are not the set creator. You may only review this set.</h3>}
        </Container>
        {this.props.words.cardSetWordsReducer[0] && this.props.words.cardSetWordsReducer[0].english_entry &&
        // Media query for responsiveness, resizes the WordsGrid based on screen size,
        // setting height of the wordcards and number of columns in grid
          <Media queries={{
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)"
          }}>
            {matches => (
              <Fragment>
                {matches.small && <WordsGrid 
                  cellHeight={160}
                  columns={2}
                  removeWordMode={this.state.removeWordMode}
                  handleRemoveWord={this.handleRemoveWord}
                  />}
                {matches.medium && <WordsGrid 
                  cellHeight={250}
                  columns={3}
                  removeWordMode={this.state.removeWordMode}
                  handleRemoveWord={this.handleRemoveWord}
                  />}
                {matches.large && <WordsGrid 
                  cellHeight={250}
                  columns={4}
                  removeWordMode={this.state.removeWordMode}
                  handleRemoveWord={this.handleRemoveWord}
                  />}
              </Fragment>
            )}
          </Media>
        }
      </div>
    )
  }
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(WordsList);