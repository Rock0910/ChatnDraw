'use strict';

module.exports ={
	serve:(path,table,servant)=>{
		const FS = require('fs');
		const PATH = require('path');
		
		FS.readFile(path,(err,data)=>{
			if (err){
				console.log(err);
			}
			else{
				const TYPE = table[PATH.extname(path)];
				
				servant.serve(TYPE,data);
			}
		});
	}
}