'use strict';

exports.config = (config) => {
	const FS = require('fs');
	const PREFIX = '../htdocs/json/';
	const TABLE = {
		'.css':'text/css',
		'.html':'text/html',
		'.js':'application/javascript',
		'.json':'application/json',
		'.png':'image/png',
	};
	
	FS.readdir(PREFIX,(err,files) =>{
		if (err) {
			console.log(err);
		}
		else {
			files.forEach((file) => {
				TABLE['/'+file] = PREFIX + file;
			});
		}
	});
	
	FS.readFile(config,(err,data) =>{
		if (err) {
			console.log(err);
		}
		else {
			const CONTENTS = JSON.parse(data);
			
			for(var key in CONTENTS){
				TABLE[key] = CONTENTS[key];
			}
		}
		
		console.log('routing_table: '+JSON.stringify(TABLE,null,2));
	});
	
	return{
		route:(request,servant) => {
			const URL = require('url');
			
			let postData = '';
			
			request.setEncoding('utf8');
			
			request.on('data',(chunk) => {
				postData += chunk;
				
				console.log('Received POST data chunk:['+chunk+'].');
			});
			
			request.on('end',()=>{
				const PATHNAME = URL.parse(request.url).pathname;
				const PROCESS = require('./process.js');
				const STATIC = require('./static.js');
				
				console.log('Request for "'+PATHNAME+'" received.');
				
				switch (request.method){
					case 'POST':
						const data = JSON.parse(postData);
						
						PROCESS.serve(PATHNAME,data,servant);
						break;
						
					case 'GET':
						if (PATHNAME in TABLE){
							STATIC.serve(TABLE[PATHNAME],TABLE,servant);
						}
						else{
							let data = (postData ? JSON.parse(postData):null);
							
							PROCESS.serve(PATHNAME,data,servant);
						}
						
						break;
						
					default:
						console.log('no suitable services found');
				}
			});
		}
	}
}