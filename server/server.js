const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Yes, I know the connection string is out in the open
// Yes, I know it is a potential security risk
// No, I would not do it that way in an actual product
// Yes, I would instead put the connection string as an environment variable
// It leads to an Mongo cluster which I'm fine with making public, so knock yourself out :)
const MONGO_URI = 'mongodb+srv://WelcomeToYourDestiny:qwerty123456@lyricaldb-wdcce.mongodb.net/songlist?retryWrites=true&w=majority';
if (!MONGO_URI) {
    throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('openUri', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
