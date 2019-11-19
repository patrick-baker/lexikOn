import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import CardSetList from '../CardSetList/CardSetList';
import './UserCardSets.css';

const AddSetButton = styled(Button) ({ // brings user to screen to add a new card set
    backgroundColor: 'green',
    borderRadius: 200,
    fontSize: 30,
});

const DeleteSetButton = styled(Button) ({
    backgroundColor: 'red',
    borderRadius: 200,
    fontSize: 30,
})

class UserCardSets extends Component {

    render() {
        return (
            <>
                <div className="button-container">
                    <AddSetButton>+</AddSetButton>
                    <DeleteSetButton>x</DeleteSetButton>
                </div>
            <CardSetList/>
            </>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(UserCardSets);