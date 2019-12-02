import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardSetList from '../CardSetList/CardSetList';

class inverseUserCardSets extends Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <h3 style={{color: '#81B1D5'}}>Add A Set</h3>
                <CardSetList listType="inverseUserSets"/>
            </div>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(inverseUserCardSets);