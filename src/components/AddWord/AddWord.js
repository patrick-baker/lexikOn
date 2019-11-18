import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ShowResults from '../ShowResults/ShowResults';
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography, TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import './AddWord.css';
import axios from 'axios';

class Search extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'GET_CATEGORIES' });
    }

    state = {
        keyword: '',
        imageToShow: ''
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

    checkDataBaseForWord = () => {
        // Runs axios request to server to check for match of searched word, runs modal if match is found
        console.log('in checkDataBaseForWord');
        axios({
            method: 'GET',
            url: `/api/translate/checkDB/en/${this.props.newWord.translateFromReducer}`
        })
        .then( response => {
            console.log(response);
            // have this generate a modal if it is successful, which prompts the user to use the existing word
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
                                {/* {this.props.imagesReducer[0] && <img className="add-word-image" src={this.props.imagesReducer[0].webformatURL}/>} */}
                        </CardContent>
                            {this.props.newWord.imagesReducer[0] && <CardMedia
                                title={this.props.newWord.translateFromReducer}
                                src={this.props.newWord.imagesReducer[0].largeImageURL} 
                                // Math.floor(Math.random() * this.props.imagesReducer.length) //function to find random image for translation
                                className="add-word-image"
                                component="img"
                                >
                                {/* <img 
                                src={this.props.imagesReducer[0].webformatURL} 
                                className="add-word-image"
                                /> */}
                            </CardMedia>}
                    </CardActionArea>
                        {/* <CardActions>
                        <Button size="small" color="primary">
                            Submit
                        </Button>
                    </CardActions> */}
                </Card>
                    {/* <ShowResults /> */}
                    <Button size="small" color="primary" variant="outlined" onClick={this.checkDataBaseForWord}>
                        Submit
                    </Button>
            </div>
                )
            }
        }
        
const mapReduxStateToProps = (reduxState) => {
    return reduxState;
              }
            
export default connect(mapReduxStateToProps)(Search);