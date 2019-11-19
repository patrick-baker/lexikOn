import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'; // components for newWordCard contents
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'; // components for working with modal if currently displayed word does not exist in DB
import './AddWord.css';
import axios from 'axios';
import Swal from 'sweetalert2'

class AddWord extends Component {
    state = {
        keyword: '',
        imageToShow: '',
        open: false
    }

    handleInput = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }

    handleSearch = () => {
        this.props.dispatch({ type: 'FETCH_TRANSLATION', payload: this.state.keyword.charAt(0).toUpperCase() + this.state.keyword.slice(1) });
        this.props.dispatch({ type: 'FETCH_IMAGE', payload: this.state.keyword });
        this.setState({
            keyword: ''
        })
    }

    handleClose = () => {
        this.setState({ open: false });
      };

    checkDataBaseForWord = () => {
        // Runs axios request to server to check for match of searched word, runs modal if match is found
        console.log('in checkDataBaseForWord');
        axios({
            method: 'GET',
            url: `/api/translate/checkDB/en/${this.props.newWord.translateFromReducer}`
        })
            .then(response => {
                // if response from database is conclusive, sets local state open property to true, 
                //which renders a dialog to prompt user to use the preexisting word in their card set
                if (response.data[0]) { 
                    this.setState({
                        open: true
                    })
                }
                else {
                    // sends current translation results to SAGA, to make new word row in DB and add to card set.
                    console.log(this.props.newWord);
                    this.props.dispatch({type: 'ADD_NEW_WORD_TO_SET', payload: {
                        original_word: this.props.newWord.translateFromReducer,
                        translation: this.props.newWord.translationReducer,
                        image: this.props.newWord.imagesReducer[0].largeImageURL
                        }
                    })
                    Swal.fire(
                        'The word has been added to your deck!',
                        'Success',
                        'success'
                      )
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="card-container">
                <h2>New Word Card</h2>
                <Card className="new-word-card">
                    <CardActionArea>
                        <CardContent>
                            <div className="add-word-form">
                                <TextField
                                    style={{ margin: 0 }}
                                    id="outlined-basic"
                                    label="Translate here"
                                    value={this.state.keyword}
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleInput}
                                    color="primary"
                                />
                                <Button variant="outlined" color="primary" onClick={this.handleSearch}>SEARCH</Button>
                                <RadioGroup aria-label="language-choice" name="language-choice" row>
                                    <FormControlLabel
                                        value="En"
                                        control={<Radio color="primary" />}
                                        label="En Input"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="Ru"
                                        control={<Radio color="secondary" />}
                                        label="Ru Input"
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                            </div>
                            <Typography gutterBottom color="textSecondary" variant="h5" component="h2">
                                Original Word: {this.props.newWord.translateFromReducer}
                            </Typography>
                            <Typography variant="body2" variant="h5" component="p">
                                Translation: {this.props.newWord.translationReducer}
                            </Typography>
                        </CardContent>
                        {this.props.newWord.imagesReducer[0] && <CardMedia
                            title={this.props.newWord.translateFromReducer}
                            src={this.props.newWord.imagesReducer[0].largeImageURL}
                            // Math.floor(Math.random() * this.props.imagesReducer.length) //function to find random image for translation
                            className="add-word-image"
                            component="img"
                        >
                        </CardMedia>}
                    </CardActionArea>
                </Card>
                <Button size="small" color="primary" variant="outlined" onClick={this.checkDataBaseForWord}>
                    Submit
                    </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Pre-existing word?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This word already exists in the database. 
                            The preexisting word will be added to your card set.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        {/* Pressing agree should add the preexisting word to the card set, 
                        Post request to cards_words junction table */}
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(AddWord);