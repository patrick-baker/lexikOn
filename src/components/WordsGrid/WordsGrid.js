import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList, GridListTile, GridListTileBar, Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { styled } from '@material-ui/core/styles';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

const WordsListContainer = styled(Container)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
});

const WordsGridList = styled(GridList)({
    width: '80%',
    height: '70%',
});

const DeleteWordIcon = styled(ClearRoundedIcon)({
    color: 'white'
})

class WordsGrid extends Component {
    render() {
        return (
            <>
                {/* Maps through the cardSetWordsReducer to display the words on the screen. */}
                <WordsListContainer>
                    {/* Takes in cellHeight, columns from WordsList through props for responsiveness */}
                    <WordsGridList cellHeight={this.props.cellHeight} cols={this.props.columns}>
                        {this.props.words.cardSetWordsReducer.map(word => (
                            <GridListTile key={word.wordInSetId}>
                                <img src={word.image_url} alt={word.english_entry} />
                                <GridListTileBar
                                    title={<div>En: {word.english_entry}<br />Ру: {word.russian_entry}</div>}
                                    subtitle={<p>Photo: {word.image_artist}</p>}
                                    actionIcon={
                                        // Renders delete word icon if in deleteWordMode, inherited from parent
                                        this.props.removeWordMode &&
                                        <IconButton
                                            aria-label={`info about ${word.english_entry}`}
                                            style={{ color: 'white' }}
                                            onClick={() => this.props.handleRemoveWord(word.wordInSetId)}>
                                            <DeleteWordIcon />
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </WordsGridList>
                </WordsListContainer>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(WordsGrid);