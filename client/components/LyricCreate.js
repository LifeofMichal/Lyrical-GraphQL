import React, { Component } from 'react'

import { graphql } from 'react-apollo'

import mutation from '../mutations/addLyricToSong'

import { Form } from 'semantic-ui-react'

class LyricCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content: '',
            waiting: false
        }
    }

    onSubmit(event) {
        event.preventDefault() // prevents the form from submitting itself automatically

        this.props.mutate({
            variables: {
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(() => console.log("Success"))
            .catch(() => console.log("Failure"))

        this.setState({ content: '' })

    }

    render() {

        return (
            <Form onSubmit={this.onSubmit.bind(this)}>
                <Form.Field>
                    <label>Add a Lyric:</label>
                    <input
                        required
                        placeholder='Insert lyric'
                        onChange={e => this.setState({ content: e.target.value })}
                        value={this.state.content}
                    />
                </Form.Field>
                <Form.Field>
                    <button type="submit" className="ui button">Add a New Lyric</button>
                </Form.Field>
            </Form>
        )
    }
}

export default graphql(mutation)(LyricCreate)