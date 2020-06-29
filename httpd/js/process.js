'use strict';

module.exports = {
	serve: (path,data,servant) =>{
		const FS = require('fs');
		const prefix = '../htdocs/json/';
		
		switch (path){
			case '/save':
				let map = JSON.stringify(data,null,2);
				
				FS.writeFile(prefix + data.name + '.json',map,'utf8',(err)=>{
					if (err){
						console.log(err);
					}
					
					servant.serve('text/plain','OK');
				});
				
				break;
				
			case '/map_list':
				FS.readdir(prefix,(err,files) =>{
					if (err) {
						console.log(err);
					}
					else{
						servant.serve('application/json',JSON.stringify(files));
					}
				});
				
				break;
				
			case '/tile_sheet':
				FS.readdir('../htdocs/png/spritelib/',(err,files) =>{
					if(err) {
						console.log(err);
					}
					else{
						servant.serve('application/json',JSON.stringify(files.filter((file)=>{
							return file.substr(-4) === '.png';
							})
						));
					}
				});
				
				break;
			
			default:
				servant.error();
				
				break;
		}
	}
}