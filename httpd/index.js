'use strict';

(() => {
	const HTTPD = require('./js/httpd').config('./config.json');
	HTTPD.listen(8081);
	console.log("Come to localhost:8081");
	
	
	
	const WebSocket = require('ws');
	const wss = new WebSocket.Server({port:8080,clientTracking:true});
	wss.on('connection',function connection(ws){
		console.log('CONNECTED A SHET');
		
		ws.on('close',()=>{
		console.log('CLOSED');
		});
		
		ws.onmessage = function incoming(message){
			let msg = JSON.stringify(JSON.parse(message.data));
			let clients = wss.clients;
			clients.forEach(client =>{
				client.send(msg);
			});
			console.log("sent");
		};
	});
})();