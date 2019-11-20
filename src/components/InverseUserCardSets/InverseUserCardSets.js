import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CardSetList from '../CardSetList/CardSetList';

class inverseUserCardSets extends Component {

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <>
                <CardSetList listType="inverseUserSets"/>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(inverseUserCardSets);