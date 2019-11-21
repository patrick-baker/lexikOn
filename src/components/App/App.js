import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
  useParams
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import AddWord from '../AddWord/AddWord';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import UserCardSets from '../UserCardSets/UserCardSets';
import InverseUserCardSets from '../InverseUserCardSets/InverseUserCardSets';
import WordsList from '../WordsList/WordsList';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_USER_CARD_SETS'}); // fetches card sets for this user, to show on card sets page
    this.props.dispatch({type: 'FETCH_INVERSE_USER_CARD_SETS'}); // fetches all card sets that this user does not have in repertoire, to show on card sets to add page
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            <ProtectedRoute
              exact
              path="/add-word/:setId"
              component={AddWord}
            />
            <ProtectedRoute
              exact
              path="/card-sets"
              component={UserCardSets}
            />
            <ProtectedRoute
              exact
              path="/inverse-card-sets"
              component={InverseUserCardSets}
            />
            <ProtectedRoute
              exact
              path="/card-set-words/:id"
              component={WordsList}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
          {/* <pre>{JSON.stringify(this.props)}</pre> */}
        </div>
      </Router>
  )}
}

const mapReduxStateToProps = (reduxState) => {
  return reduxState;
}

export default connect(mapReduxStateToProps)(App);