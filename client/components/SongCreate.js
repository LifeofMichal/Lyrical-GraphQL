import React, { Component } from 'react'

import { Link, hashHistory } from 'react-router'
import { graphql } from 'react-apollo'

import query from '../queries/fetchSongs'
import mutation from '../mutations/addSong'

import { Header, Form, Label, Icon, Loader } from 'semantic-ui-react'

class SongCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: '',
            author: '',
            waiting: false,
            message: null,
            color: null
        }
    }

    success() {
        this.setState({
            waiting: false,
            message: 'Success! New Song Added!',
            color: 'green'
        })
        setTimeout(function () {
            hashHistory.push('/')
        }, 1000)
    }

    failure() { // set timeout to this
        this.setState({
            waiting: false,
            message: 'Something went wrong! Check your Internet Connection!',
            color: 'red'
        })
    }

    onSubmit(event) {
        event.preventDefault() // prevents the form from submitting itself automatically

        this.setState({
            waiting: true
        })

        this.props.mutate({
            variables: {
                title: this.state.title,
                author: this.state.author
            },
            refetchQueries: [{ query: query }]
        }).then(() => this.success())
            .catch(() => this.failure())
    }

    render() {
        return (
            <div>
                <Link to="/">
                    <Label color='blue'><Icon name='arrow left'></Icon>Back</Label><br></br><br></br>
                </Link>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <Header as='h2'>Create a New Song</Header>
                    <Form.Field>
                        <label>Song Name:</label>
                        <input
                            placeholder='Insert song name'
                            onChange={e => this.setState({ title: e.target.value })}
                            value={this.state.title}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Song Author:</label>
                        <input
                            placeholder='Insert song author'
                            onChange={e => this.setState({ author: e.target.value })}
                            value={this.state.author}
                        />
                    </Form.Field>
                    <Form.Field>
                        <button type="submit" className="ui button">Create a New Song</button>

                        {this.state.waiting
                            ? <Loader active inline size='medium'></Loader>
                            : null
                        }

                        {this.state.message && this.state.color
                            ? <Label basic color={this.state.color}>{this.state.message}</Label>
                            : null
                        }

                    </Form.Field>
                </Form>
            </div>
        )
    }
}

export default graphql(mutation)(SongCreate)