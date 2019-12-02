import React from 'react';
import Container from '@material-ui/core/Container';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div style={{textAlign: 'center'}}>
    <Container style={{maxWidth: '80%'}}>
      <br/>
    <h2>Home Page</h2>
      <p>
        The home page shows your active card sets. 
        Clicking on these will bring your to the word list page of that card set.
        If you click the plus button near the top, you will have the option of adding another user's preset card set, or making your own.
        The edit button will allow you to edit or permanently destroy one of the sets you have made, or remove another user's set from your active sets.
      </p>
      <br/>
    <h2>Words List</h2>
      <p>
        This page will allow you to see the words that are in your chosen card set. 
        If this set is of your creation, you have the option of removing words from the list by pressing the x
        button near the title, or add words to the list by clicking the nearby plus button.
      </p>
      <br/>
    <h2>Add Word Page</h2>
      <p>
        Once you type a word into the search box, choose the your input language and search. 
        If you like your image and translation, you can add this card to your card set.
      </p>
      </Container>
  </div>
);

export default AboutPage;
