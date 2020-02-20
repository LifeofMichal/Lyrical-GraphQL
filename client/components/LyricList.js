import React, { Component } from 'react'
import { List, Label, Icon } from 'semantic-ui-react'

import { graphql } from 'react-apollo'
import mutation from '../mutations/likeLyric'

class LyricList extends Component {

    onLike(id, likes) { // the only reason we're sending likes here, is to be able to use them for the optimisticResponse
        this.props.mutate({
            variables: { id: id },
            optimisticResponse: { // creating and assigning optimistic response to action
                __typename: 'Mutation', // HAVE TO define the mutation
                likeLyric: { // we're literally specifiying the data in the graphql request
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
            }
        }).then(() => console.log("Success"))
            .catch(() => console.log("Failure"))
    }

    render() {
        return (
            <List>
                {
                    this.props.lyrics.map(({ id, content, likes }, index) => {
                        return (
                            <List.Item key={id}>
                                {content}<i style={{ color: "gray" }}> #{index + 1}</i>
                                <Label><Icon onClick={() => this.onLike(id, likes)} name='thumbs up'></Icon>{likes}</Label> {/* send in like ONLY for the sake of Optimistic Response */}
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }
}

export default graphql(mutation)(LyricList)