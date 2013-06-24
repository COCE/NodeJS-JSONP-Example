/*!
 * JSONP example for Node.js
 * KILLHAPPY. 2013-06-24
 */

var express = require("express"),
    url = require("url");

var port = 8088;

var app = express.createServer();

app.configure(function(){
	app.use( express.methodOverride() );
	app.use( express.bodyParser() );
	app.use( app.router );
});

app.get("/example/jsonp", function( req, res ){

	var u = url.parse( req.url, true );

	var return_data = {
		"code": 200,
		"data": "example"
	};

	if( u.query.callback ){
		var CALLBACK = u.query.callback;
		res.writeHead( 200 );
		res.end( CALLBACK + "(" + JSON.stringify( return_data ) + ")" );
		console.log( "---- Jsonp" );
	}
	else{
		res.writeHead( 200 );
		res.end( JSON.stringify( return_data ) );
		console.log( "---- No Jsonp" );
	}

});

app.listen(port, function(){
	console.log( "---- app is listening on port: " + port );
});
