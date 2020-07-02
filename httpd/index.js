'use strict';

(() => {
	const HTTPD = require('./js/httpd').config('./config.json');
	HTTPD.listen(8081);
	console.log("Come to localhost:8081");
	
	const io = require('socket.io');
})();