/* eslint-disable no-undef */
// @ts-nocheck
const express = require("express");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require( "apollo-server-express" );

const cors = require("cors");
const fs = require("fs");
const resolvers = require("./resolvers");

const port = 9000;
const app = express();
const path = '/graphql';


const typeDefs = gql `${ fs.readFileSync( __dirname.concat( '/schema.graphql' ), 'utf8' ) }`;

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path });
app.use( cors() );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );


app.listen( port, () => console.info( `Server started on port ${ port }`) );
