'use strict';

(() => {
	const HTTPD = require('./js/httpd').config('./config.json');
	HTTPD.listen(8081);
	console.log("Come to localhost:8081");
	
	
	
	const WebSocket	= require('ws');
	const wss = new WebSocket.Server({port:8080});
	wss.on('connection',function connection(ws){
		console.log('CONNECTED A SHET');
		
		ws.on('close',()=>{
		console.log('CLOSED');
		});
		
		ws.on('message',function incoming(message){
		console.log(message);
		});
	});
})();