'use strict';

exports.config = (response) =>{
	function ack(code,type,data){
		response.writeHead(code,{
			'Content-Type':type
		});
		
		response.write(data);
		response.end();
	}
	
	return {
		error:()=>{
			ack(404,'text/plain','Page Not Found!\n')
		},
		
		serve:(type,data)=>{
			ack(200,type,data);
		}
	};
};