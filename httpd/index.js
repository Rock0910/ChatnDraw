'use strict';

(() => {
	const HTTPD = require('./js/httpd').config('./config.json');
	HTTPD.listen(8081);
	console.log("Come to localhost:8081");
	
	
	
	const WebSocket = require('ws');
	const wss = new WebSocket.Server({port:8080,clientTracking:true});
	
	let chatData = [];
	wss.on('connection',function connection(ws){
		console.log('Client Connected +1');
		
		ws.on('close',()=>{
		console.log('CLOSED');
		});
		
		ws.onmessage = function incoming(message){
			let msg = JSON.parse(message.data);
			switch(msg.type){
				case "userSentMsg":
					if(chatData.length > 9){
						chatData.shift();
					}
					chatData.push(msg.text);
					//console.log(chatData.length);
					//console.log(chatData);
					break;
					
				case "chatLoaded":
					let pastMessage = {
						type: "pastMessage",
						text: chatData,
					};
					let test = JSON.stringify(pastMessage);
					ws.send(test);
					console.log("loaded");
					break;
			}
			
			if (msg.type != "chatLoaded"){
				let stringifyMsg = JSON.stringify(msg);
				let clients = wss.clients;
				clients.forEach(client =>{
					client.send(stringifyMsg);
				});
			}
			else{
				console.log(msg.type);
			}
		};
	});
})();