import React, { Component } from 'react'
import { Link } from 'react-router'

import { graphql } from 'react-apollo'

import query from '../queries/fetchSong'

import { Header, Label, Icon, Loader } from 'semantic-ui-react'

import LyricList from './LyricList'
import LyricCreate from './LyricCreate'

class SongDetails extends Component {

    render() {
        const { song } = this.props.data

        if (!song) {
            return (
                <div>
                    <Link to="/">
                        <Label color='blue'><Icon name='arrow left'></Icon>Back</Label>
                    </Link>
                    <Loader active inline size='medium'></Loader>
                </div>
            )
        }

        return (
            <div>
                <Link to="/">
                    <Label color='blue'><Icon name='arrow left'></Icon>Back</Label>
                </Link>

                <Header as='h2'>{song.title}</Header>

                <Label image><i>Author:</i> {song.author}</Label>

                <br></br><br></br>

                {song.lyrics.length > 0
                    ? <LyricList lyrics={song.lyrics} />
                    : <Label basic color='red' pointing>This song has no stored lyrics</Label>
                }

                <br></br><br></br>

                <LyricCreate songId={song.id} />


            </div>
        )
    }
}

export default graphql(query, {
    options: (props) => {
        return { variables: { id: props.params.id } }
    }
})(SongDetails)

/*
    Remember the fucking issue when the app crashes when you add a new song, after including likes?

    You were underfetching the likes in the fetchSong mutation.
    You used 'likeLyric' mootation for updating, and you do have id, content, likes for the Lyric data,
    but in the fetchSong (which is re-run by the dataIdFromObject in index.js) did not have it (it was
    only fetching the id, and content for each lyric), and Apollo get's confused and crashes

    Make sure you ALWAYS have consistent data fetching between queries that fetch
    same data from differenet places. EVEN if it results in a bit of over-fetching, when you're letting
    Apollo's Store (dataIdFromObject) handle it automatically.

*/