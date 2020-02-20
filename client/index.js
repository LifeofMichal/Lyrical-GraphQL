import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import App from './components/App'
import SongList from './components/SongList'
import SongCreate from './components/SongCreate'
import SongDetails from './components/SongDetails'

const client = new ApolloClient({
    dataIdFromObject: object => object.id // 'o' stand for 'object'

    // simple implementation but the logic of this is that wiht this dataIfFromObject
    // value, the Apollo Store runn all data through this funtion,
    // and well be able to assign objects it to the piece of data for itself

    // basically, we tell Apollo Store to assign the id's to objects so Apollo can 
    // map them up and use them later for identification

    // ONLY WORKS WHEN ALL THE ID's ARE UNIQUE
    // ...and you might not always need to use memory to make Apollo map all the data

    // IN SHORT
    // since Apollo Store can see all the ID's now, it will know when an object with an 
    // id is updated, then it will notify react and re-render a component
})

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={SongList} />
                    <Route path="songs/new" component={SongCreate}></Route>
                    <Route path="songs/:id" component={SongDetails}></Route> {/* :id - definition of variable in the url in React Router*/}
                </Route>
            </Router>
        </ApolloProvider>
    )
}

ReactDOM.render(
    <Root />,
    document.querySelector('#root')
);
