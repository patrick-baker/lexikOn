import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardSetList from '../CardSetList/CardSetList';

class inverseUserCardSets extends Component {

    render() {
        return (
            <div>
                <CardSetList listType="inverseUserSets"/>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(inverseUserCardSets);