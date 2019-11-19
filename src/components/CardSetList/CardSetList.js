import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Container, Button} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const ListContainer = styled(Container) ({

});

class CardSetList extends Component {

    render() {
        return (
            <ListContainer maxWidth="lg">
               {this.props.cardSets.userCardSetsReducer[0] && 
               this.props.cardSets.userCardSetsReducer.map(set => 
                    <p key={set.id}>{set.name}</p>)}
            </ListContainer>
        )
    }
}

const mapReduxStateToProps = (reduxState) => {
    return reduxState;
}

export default connect(mapReduxStateToProps)(CardSetList);