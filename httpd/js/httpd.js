'use strict';

exports.config = (config) => {
	const HTTP = require('http');
	const ROUTER = require('./router.js').config(config);
	
	return HTTP.createServer((request,response) => {
		const SERVANT = require('./response.js').config(response);
		
		ROUTER.route(request,SERVANT);
	});
};