// require('dotenv').config()
const express = require( 'express' )
const app = express()
const port = process.env.PORT || 8080
const path = require( 'path' )

const bodyParser = require( 'body-parser' )
const mongoose = require( 'mongoose' )

const router = require('./server/routes/api')

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )

app.use( express.static( path.join( __dirname, 'dist' ) ) )
app.use( '/', router )

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/weather', { useNewUrlParser: true } ).then( () => {
    app.listen( port, () => console.log( `Running server on port ${ port }` ) )
} )

