import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'; // components for newWordCard contents
import InputAdornment from '@material-ui/core/InputAdornment';
import TranslateRoundedIcon from '@material-ui/icons/TranslateRounded';
import './AddWord.css';
import axios from 'axios';
import Swal from 'sweetalert2';

import Modal from '../Modal/Modal';

class AddWord extends Component {
    state = {
        keyword: '', // searched word stored in local state
        open: false, // open status of the modal for adding existing word, if searched word already exists in DB
        preexistingWordId: '', // sets the preexisting word id to local state, if user wants to add this word to their set
        inputLanguage: 'en-ru'
    }

    checkDataBaseForWord = () => {
        // Runs axios request to server to check for match of searched word in relevant language, runs modal if match is found
        console.log('in checkDataBaseForWord');
        axios({
            method: 'GET',
            url: `/api/translate/checkDB/${this.props.inputLanguage}/${this.props.newWord.translateFromReducer}`
        })
            .then(response => {
                // if response from database is conclusive, sets local state open property to true, 
                //which renders a dialog to prompt user to use the preexisting word in their card set
                if (response.data[0]) {
                    console.log(response.data[0]); 
                    this.setState({
                        open: true,
                        preexistingWordId: response.data[0].id
                    })
                }
                else {
                    // sends current translation results to SAGA, to make new word row in DB and add to card set.
                    console.log(this.props.newWord);
                    this.props.dispatch({type: 'ADD_NEW_WORD_TO_SET', payload: {
                        original_word: this.props.newWord.translateFromReducer,
                        translation: this.props.newWord.translationReducer,
                        image: this.props.newWord.imagesReducer[0].urls.regular,
                        imageAuthor: this.props.newWord.imagesReducer[0].user.name,
                        set_id: this.props.match.params.setId
                        }
                    })
                    Swal.fire(
                        'The word has been added to your deck!',
                        'Success',
                        'success'
                      )
                    this.clearTranslationReducers();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // clears the reducers displaying on this page, so the page is clear the next time it is reached
    clearTranslationReducers = () => {
        this.props.dispatch({ type: 'GET_TRANSLATION', payload: '' });
        this.props.dispatch({ type: 'GET_IMAGES', payload: [] });
        this.props.dispatch({ type: 'TRANSLATE_FROM', payload: ''});
    }

    // adds preexisting DB word if the user clicks agree in the modal
    // the modal appears if the submit button is clicked, and checkDataBaseForWord() axios request returns a response (finds the word)
    handleAddExistingWord = () => {
        this.props.dispatch({ type: 'ADD_EXISTING_WORD_TO_SET', payload: {
            word_id: this.state.preexistingWordId,
            set_id: this.props.match.params.setId
            } 
        })
        this.handleClose();
        this.clearTranslationReducers();
    }

    // closes modal dialog box
    handleClose = () => {
        this.setState({ open: false });
      };

    // sets the keyword in local state from searched word
    handleInput = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }

    handleRadioChange = event => {
        this.setState({
            inputLanguage: event.target.value
        })
    }

    handleSearch = () => {
        this.props.dispatch({ type: 'FETCH_TRANSLATION', payload: {
            language: this.state.inputLanguage,
            search: this.state.keyword.charAt(0).toUpperCase() + this.state.keyword.slice(1) 
        }
    });
        this.props.dispatch({ type: 'FETCH_IMAGE', payload: this.state.keyword });
        this.setState({
            keyword: ''
        })
    }

    render() {
        return (
            <div className="card-container">
                <h4 style={{margin: 0}}>New Word Card</h4>
                <Card className="new-word-card">
                    <CardActionArea>
                        <CardContent>
                            <div className="add-word-form">
                                <TextField
                                    style={{ margin: 0 }}
                                    id="outlined-basic"
                                    label="Translate here"
                                    value={this.state.keyword}
                                    margin="dense"
                                    variant="outlined"
                                    onChange={this.handleInput}
                                    color="primary"
                                    style={{maxWidth: '150px'}}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <TranslateRoundedIcon fontSize="small"/>
                                          </InputAdornment>
                                        )
                                      }}
                                />
                                <Button variant="outlined" color="primary" onClick={this.handleSearch}>SEARCH</Button>
                                <RadioGroup aria-label="language-choice" name="language-choice" value={this.state.inputLanguage} onChange={(event) => this.handleRadioChange(event)} row>
                                    <FormControlLabel
                                        value="en-ru"
                                        control={<Radio color="primary" />}
                                        label="En Input"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="ru-en"
                                        control={<Radio color="secondary" />}
                                        label="Ru Input"
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                            </div>
                            <Typography gutterBottom color="textSecondary" variant="subtitle1" component="p">
                                Original Word: {this.props.newWord.translateFromReducer}
                            </Typography>
                            <Typography variant="subtitle1" component="p">
                                Translation: {this.props.newWord.translationReducer}
                            </Typography>
                        </CardContent>
                        {this.props.newWord.imagesReducer[0] && <CardMedia
                            title={this.props.newWord.translateFromReducer}
                            src={this.props.newWord.imagesReducer[0].urls.regular}
                            // Math.floor(Math.random() * this.props.imagesReducer.length) //function to find random image for translation
                            className="add-word-image"
                            component="img"
                        >
                        </CardMedia>}
                    </CardActionArea>
                </Card>
                <Button size="small" color="primary" variant="outlined" onClick={this.checkDataBaseForWord}>
                    Add Word
                </Button>

                {/* Modal that appears if searched word already exists in DB.
                    Pressing agree should add the preexisting word to the card set, 
                    Post request to cards_words junction table */}
                <Modal 
                open={this.state.open}
                handleClose={this.handleClose}
                ariaLabelledBy="alert for existing word"
                ariaDescribedBy="this alert pops up when a user attempts to add a word that already exists in the database"
                title="Use Pre-existing word?"
                description="This word already exists in the database. 
                The preexisting word will be added to your card set."
                agreeFunction={this.handleAddExistingWord}
                agreeText="Yes"
                disagreeFunction={this.handleClose}
                disagreeText="No"        
                />
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(AddWord);