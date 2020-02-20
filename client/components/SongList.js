import React, { Component } from 'react'
import { Link } from 'react-router'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import query from '../queries/fetchSongs'
import mutation from '../mutations/deleteSong'

import { Header, List, Label, Icon, Loader, Button } from 'semantic-ui-react'

class SongList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loading: true,
            deleting: null
        }
    }

    deleteSong(payload, id) {
        switch (payload) {
            case 'delete':
                document.getElementById(`del-${id}`).style.display = "inline flow-root list-item"
                this.setState({ deleting: true })
                break
            case 'confirm':
                this.props.mutate({
                    variables: {
                        id: id,
                    }
                }).then(() => this.props.data.refetch())
                this.setState({ deleting: null })
                break
            case 'abort':
                document.getElementById(`del-${id}`).style.display = "none"
                this.setState({ deleting: null })
                break
        }
    }

    renderSongs() {
        return (
            this.props.data.songs.map(song =>
                <List.Item key={song.id}>
                    <Label color='blue'>
                        <Icon name='music'></Icon>
                        <Link to={`/songs/${song.id}`}>
                            {song.title}
                        </Link>
                        <Icon disabled={this.state.deleting ? true : false} name='delete' onClick={() => this.deleteSong('delete', song.id)}></Icon>
                    </Label>

                    <div id={`del-${song.id}`} style={{ display: "none" }}>
                        <Label onClick={() => this.deleteSong('abort', song.id)} color='green'>Go Back<Icon name='arrow left'></Icon></Label>
                        <Label onClick={() => this.deleteSong('confirm', song.id)} color='red'>Delete<Icon name='delete'></Icon></Label>
                    </div>

                    <Label image>
                        <i>Author:</i> {song.author}
                    </Label>

                </List.Item>
            )
        )
    }

    render() {
        return (
            <div>
                <Header as='h2'>List of Songs</Header>
                <List divided relaxed>
                    {this.props.data.songs ? this.renderSongs() : <Loader active inline />}
                </List>
                <Link to="/songs/new">
                    <Icon name='plus' size='huge' circular={true} corner='bottom right' color='red'></Icon>
                </Link>
            </div >
        )
    }
}

export default graphql(mutation)(graphql(query)(SongList))