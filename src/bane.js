'use restrict';
const ws = new WebSocket('ws://localhost:8080');
ws.onopen =()=>{
	console.log('open');
};
ws.onclose =()=>{
	console.log('closed');
};

window.addEventListener("load",()=>
{
	genInterface();
	
	let Painter = document.getElementById("canvas").getContext("2d");
	
	ws.onmessage = function incoming(message){
		let msg = JSON.parse(message.data);
		//console.log(msg);
		console.log(msg.type);
		switch(msg.type){
			case "userSentMsg":
				let nowTime = new Date();
				document.getElementById("chatDisplay").value += nowTime.getHours()+":"+
					(nowTime.getMinutes()<10?"0":"")+nowTime.getMinutes()+
					" "+msg.text.x+" : "+msg.text.y+"\n";
					document.getElementById("chatDisplay").scrollTop = document.getElementById("chatDisplay").scrollHeight;
					console.log("Got Other's message");
				break;
					
			case "userSentDrawing":
				Painter.fillStyle = msg.text.penColor;
				Painter.fillRect(msg.text.x,msg.text.y,msg.text.penSize,msg.text.penSize);
				break;
				
			case "pastMessage":
				let list = msg.text;
				//let messageList = list.map(item => Object.values(item));
				//console.log(messageList);
				console.log(list[0].x,list[0].y);
				let textDisplay = document.getElementById("chatDisplay");
				textDisplay.value += "歷史訊息(最多十筆)\n\n";
				list.forEach(object =>{
					textDisplay.value += 
					" "+object.x+" : "+object.y+"\n";
					textDisplay.scrollTop = textDisplay.scrollHeight;
				});
				textDisplay.value += "\n以上為歷史訊息\n\n";
				break;
			
			case "WipeBoard":
				document.getElementById("canvas").getContext("2d").clearRect(0,0,canvas.width,canvas.height);
				console.log("WipedBoard");
				
			default:
				console.log("FAIL : "+msg.type);
				break;
		}
	}
	let chatLoaded = {type: "chatLoaded"};
	ws.send(JSON.stringify(chatLoaded));
});

function  genInterface(){
	let html=document.querySelector("html");
	html.style.backgroundColor = "black";
	html.style.overflow = "auto";
	
	let styleList = genStyleList();
	
	let body = document.body;
	body.style.height = "100vh";
	body.style.width = "100vw";
	body.style.margin = "0";
	
	let topCtn = genElement("topCtn","div");
	topCtn.style.paddingLeft = "3vw";
	topCtn.style.paddingRight = "3vw";
	topCtn.style.height = "10vh";
	topCtn.style.width = "94vw";
	topCtn.style.display = "flex";
	topCtn.style.justifyContent = "space-between";
	topCtn.style.alignItems = "center";
	topCtn.style.margin = "auto";
	//topCtn是畫面最上方的物品容器，然後調整他的style屬性
	
	let topBtn = genElement("topBtn","button");
	topBtn.innerText = "≡";
	topBtn.style.display = "flex";
	topBtn.style.justifyContent = "center";
	topBtn.style.marginLeft = "2.5vw";
	topBtn.style.fontSize = "2vw";
	topBtn.style.textAlign = "center";
	topBtn.style.height = "5vh";
	topBtn.style.width = "5vw";
	//topBtn是在topCtn裡面的一個按鈕，改了裡面的字等屬性
	
	let topTitle = genElement("topTitle","h1");
	topTitle.innerText = "這是啥小阿~~~~";
	topTitle.style.color = "white";

	let topBlock = genElement("topBlock","div");
	topBlock.style.width = "5vw";
	topBlock.style.marginright = "2.5vw";
	
	topCtn.appendChild(topBtn);
	topCtn.appendChild(topTitle);
	topCtn.appendChild(topBlock);
	body.appendChild(topCtn);
	//topTitle是在topCtn裡面的文字，使用了h1的屬性
	
	topBtn.addEventListener("click",()=>
	{
		if(document.querySelector("#navMenu"))
		{
			bodyLayout.removeChild(document.querySelector("#navMenu"));
		}
		else
		{
			bodyLayout.insertBefore(navMenu,bodyLayout.firstChild);
		}
	});
	
	let bodyLayout = genElement("bodyLayout","div");
	//bodyLayout.style.backgroundColor = "white";
	bodyLayout.style.paddingLeft = "3vw";
	bodyLayout.style.height = "90vh";
	bodyLayout.style.width = "100vw";
	bodyLayout.style.display = "flex";
	bodyLayout.style.flexDirection = "row";
	//bodyLayout.style.display = "flex";
	//bodyLayout.style.justifyContent = "center";
	//bodyLayout.style.alignItems = "center";
	bodyLayout.style.margin = "auto";
	body.appendChild(bodyLayout);
	
	let mainBoard = genElement("mainBoard","div");
	//mainBoard.style.backgroundColor = "gray";
	mainBoard.style.height = "85vh";
	mainBoard.style.width = "80vw";
	mainBoard.style.marginLeft = "3vw";
	mainBoard.style.display = "flex";
	mainBoard.style.justifyContent = "space-between";
	mainBoard.style.borderStyle = "solid";
	mainBoard.style.borderWidth = "0.2vh";
	mainBoard.style.borderColor = "green";
	
	let boardBlock = genElement("boardBlock","div");
	
	bodyLayout.appendChild(mainBoard);
	
	let paintBoardCtn = genBoard();
	
	let chatCtn = genChat();
	mainBoard.appendChild(paintBoardCtn);
	mainBoard.appendChild(boardBlock);
	mainBoard.appendChild(chatCtn);
	
	let navMenu =genMenu();

	Resize();
	//body.onresize = function(){Resize()};
}

function Resize(){
		document.getElementById("canvas").height = 900//paintBoardCtn.clientHeight;
		document.getElementById("canvas").width = 1440//paintBoardCtn.clientWidth;
}

function genElement(x,y){
	let cache =document.createElement(y);
	cache.id = x;
	
	return cache;
}

function genMenu(){
	let navMenu = genElement("navMenu","nav");
	navMenu.style.userSelect = "none";
	navMenu.style.borderStyle = "solid";
	navMenu.style.borderWidth = "0.2vh";
	navMenu.style.borderColor = "white";
	navMenu.style.display = "flex";
	navMenu.style.flexDirection = "column";
	navMenu.style.justifyContent = "space-between";
	navMenu.style.alignContent = "space-between";
	navMenu.style.backgroundColor = "gray";
	navMenu.style.color = "gray";
	navMenu.style.height = "85vh";
	navMenu.style.width = "10vw";
	navMenu.style.outlineWidth = "1vh";
	
	let a = document.createElement("ul");
	a.style.display ="flex";
	a.style.justifyContent = "center";
	a.style.flexDirection = "column";
	a.style.padding = "0vw";
	//a.style.paddingTop = "2vh";
	a.style.fontSize = "2vw";
	
	let b = document.createElement("div");
	b.innerText="Chat";
	b.style.backgroundColor = "cyan";
	b.style.color = "inherit";
	b.style.textDecoration = "underline";
	b.style.textAlign = "center";
	b.style.fontSize = "2vw";
	

	let chatCtn = document.getElementById("chatCtn");
	b.addEventListener("click",()=>{
		if (!document.getElementById("chatCtn")){
			document.getElementById("mainBoard").appendChild(chatCtn);
			console.log("Chat have been Shown!");
		}else{
			document.getElementById("mainBoard").removeChild(chatCtn);
			console.log("Chat have been Hidden!");
		}
	});
	/*let ba = document.createElement("a");
	ba.innerText="Chat";
	ba.style.color = "inherit";
	ba.href = "#Chat";
	b.appendChild(ba);*/
	
	let c = document.createElement("div");
	c.innerText="Paint";
	c.style.backgroundColor = "white";
	c.style.color = "inherit";
	c.style.textDecoration = "underline";
	c.style.textAlign = "center";
	
	let paintBoardCtn = document.getElementById("paintBoardCtn");
	c.addEventListener("click",()=>{
		if (!document.getElementById("paintBoardCtn")){
			document.getElementById("mainBoard").insertBefore(paintBoardCtn,document.getElementById("boardBlock"));
			console.log("Paint have been Shown!");
		}else{
			document.getElementById("mainBoard").removeChild(paintBoardCtn);
			console.log("Paint have been Hidden!");
		}
	});
	/*let ca = document.createElement("a");
	ca.innerText="Paint";
	ca.style.color = "inherit";
	ca.href = "#Paint";
	c.appendChild(ca);*/
	
	let d = document.createElement("div");
	d.innerText="Setting";
	d.style.backgroundColor = "cyan";
	d.style.color = "inherit";
	d.style.textDecoration = "underline";
	d.style.textAlign = "center";
	d.style.padding = "1vw";
	d.style.paddingBottom = "2vh";
	d.style.fontSize = "2vw";
	
	d.addEventListener("click",()=>{
		if(document.querySelector("html").style.backgroundColor == "white"){
			document.querySelector("html").style.backgroundColor = "black";
			document.querySelector("#navMenu").style.borderColor = "white";
			document.querySelector("#topTitle").style.color = "white";
		}else{
			document.querySelector("html").style.backgroundColor = "white";
			document.querySelector("#navMenu").style.borderColor = "black";
			document.querySelector("#topTitle").style.color = "black";
		}
		console.log("Setting have been Clicked!");
	});
	
	let e = document.createElement("div");
	e.innerText="清空畫布";
	e.style.backgroundColor = "cyan";
	e.style.color = "inherit";
	//e.style.textDecoration = "underline";
	e.style.textAlign = "center";
	e.style.padding = "1vw";
	e.style.paddingBottom = "2vh";
	e.style.fontSize = "1.8vw";
	
	e.addEventListener("click",()=>{
		let msg = {
			type: "WipeBoard",
			//text: {x,y},
			//id : clientID,
			//date: Date.now()
			};
			console.log(msg);
			ws.send(JSON.stringify(msg));
		console.log("CleanBoard have been Clicked!");
	});
	
	let f = document.createElement("div");
	f.innerText="↓筆顏色↓";
	f.style.backgroundColor = "cyan";
	f.style.color = "inherit";
	f.style.textAlign = "center";
	f.style.padding = "1vw";
	f.style.paddingBottom = "2vh";
	f.style.fontSize = "1.8vw";
	
	let penColorValue = genElement("penColorValue","textarea");
	penColorValue.value = "Black";
	penColorValue.style.backgroundColor = "white";
	penColorValue.style.paddingLeft = "2px";
	penColorValue.style.paddingTop = "2px";
	penColorValue.style.textAlign = "center";
	penColorValue.style.fontSize = "14px";
	
	let j = document.createElement("div");
	j.innerText="↓大小(px)↓";
	j.style.backgroundColor = "cyan";
	j.style.color = "inherit";
	j.style.textAlign = "center";
	j.style.padding = "1vw";
	j.style.paddingBottom = "2vh";
	j.style.fontSize = "1.8vw";
	
	let penSizeValue = genElement("penSizeValue","textarea");
	penSizeValue.value = "9";
	penSizeValue.style.backgroundColor = "white";
	penSizeValue.style.paddingLeft = "2px";
	penSizeValue.style.paddingTop = "2px";
	penSizeValue.style.textAlign = "center";
	penSizeValue.style.fontSize = "14px";
	
	
	a.appendChild(b);
	a.appendChild(c);
	a.appendChild(e);
	a.appendChild(f);
	a.appendChild(penColorValue);
	a.appendChild(j);
	a.appendChild(penSizeValue);
	navMenu.appendChild(a);
	navMenu.appendChild(d);	
	bodyLayout.insertBefore(navMenu,bodyLayout.firstChild);
	return navMenu;
}

function genBoard(){
	let paintBoardCtn = genElement("paintBoardCtn","div");
	paintBoardCtn.style.maxHeight = "85vh";
	paintBoardCtn.style.maxWidth = "60vw";
	paintBoardCtn.style.height = "85vh";
	paintBoardCtn.style.width = "60vw";
	paintBoardCtn.style.overflow = "hidden";
	paintBoardCtn.style.backgroundColor = "gray";
	let paintBoard = genElement("canvas","canvas");
	//let ctx = paintBoard.getContext("2d");
	paintBoard.style.backgroundColor = "white";
	
	paintBoard.addEventListener("mousedown",onMousedown);
	function onMousedown(event){
		userSentDrawing();
		paintBoard.addEventListener("mousemove",onMousemove);
		paintBoard.addEventListener("mouseup",onMouseup);
	}
	function onMousemove(event){
		userSentDrawing();
	}
	
	function userSentDrawing(){
		let x = event.offsetX;
		let y = event.offsetY;
		let penColor = document.getElementById("penColorValue").value+=(document.getElementById("penColorValue").value)==""?"Black":"";
		let penSize = document.getElementById("penSizeValue").value+=(document.getElementById("penSizeValue").value)==""?"9":"";
		let msg = {
			type: "userSentDrawing",
			text: {x,y,penColor,penSize},
			//id : clientID,
			//date: Date.now()
			};
			console.log(msg);
			ws.send(JSON.stringify(msg));
		
	}
	
	function onMouseup(event){
		paintBoard.removeEventListener('mousemove',onMousemove);
	}
	paintBoardCtn.appendChild(paintBoard);
	
	return paintBoardCtn;
}

function genChat(){
	let chatCtn = genElement("chatCtn","div");
	let chatInputCtn = document.createElement("div");
	let chatUserCtn = document.createElement("div");
	let chatDisplay = genElement("chatDisplay","textarea");
	let chatUsername = genElement("chatUsername","textarea");
	let chatInput = genElement("chatInput","textarea");
	let chatBtn = document.createElement("button");
	//chatCtn.style.backgroundColor = "cyan";
	chatCtn.style.height = "inherit";
	chatCtn.style.width = "20vw";
	//chatCtn.style.padding = "0.1vh";
	chatCtn.style.display = "flex";
	chatCtn.style.flexDirection = "column";
	chatCtn.style.borderStyle = "solid";
	chatCtn.style.borderWidth = "0 0 0 0.2vh";
	chatCtn.style.borderColor = "green";
	//chatCtn.style.justifyContent = "center";
	//chatCtn.style.backgroundColor = "cyan";
	
	chatDisplay.style.backgroundColor = "cyan";
	chatDisplay.style.height = "78vh";
	chatDisplay.readOnly = "true";
	chatDisplay.style.width = "calc(inherit-4px)";
	chatDisplay.style.padding = "2px";
	//chatDisplay.style = "display: flex; height: 4.8vh; flex-direction: row; border-style: solid; border-width: 0.2vh 0px 0px; border-color: green;"
	
	chatUserCtn.style.width = "17vw";
	chatUserCtn.style.display = "flex";
	chatUserCtn.style.flexDirection = "column";
	chatUserCtn.style.height = "7vh";
	chatUserCtn.style.borderStyle = "solid";
	chatUserCtn.style.borderWidth = "0 0 0 0.1vh";
	chatUserCtn.style.borderColor = "green";
	
	chatUsername.style.color = "white";
	chatUsername.style.width = "17vw";
	chatUsername.style.height = "4vh";
	chatUsername.style.backgroundColor = "gray";
	chatUsername.style.paddingTop = "2px";
	chatUsername.style.paddingLeft = "2px";
	chatUsername.style.fontSize = "8px";
	chatUsername.style.overflow = "hidden";
	
	chatUsername.addEventListener("keydown",()=>{
		let x = event.keyCode;
		if(x == 13){
				event.preventDefault();
		}
	});
	
	chatInput.style.backgroundColor = "white";
	chatInput.style.height = "inherit";
	chatInput.style.width = "17vw";
	chatInput.style.paddingLeft = "2px";
	chatInput.style.paddingTop = "2px";
	//chatInput.style.resize = "none";
	
	chatInput.addEventListener("keydown",onEnterKeyDown);
	chatBtn.addEventListener("click",()=>{
		sendMyMsg();
	});
	
	function onEnterKeyDown(){
		let x = event.keyCode;
		if(x == 13 && !event.shiftKey == true){
				event.preventDefault();
				sendMyMsg();
		}
	}
	
	function sendMyMsg(){
		if (chatInput.value != ""){
			let x = (chatUsername.value == ""?"匿名":chatUsername.value);
			let y = chatInput.value;
			let msg = {
			type: "userSentMsg",
			text: {x,y},
			//id : clientID,
			//date: Date.now()
			};
			ws.send(JSON.stringify(msg));
			chatInput.value = "";
		}
		else{
			console.log("至少打個訊息進去吧?");
		}
	}
/*
	function sendMsg(){
		let msg = chatInput.value;
		let nowTime = new Date();
				if (msg != ""){
					chatInput.value = "";
					chatDisplay.value += nowTime.getHours()+":"+
					(nowTime.getMinutes()<10?"0":"")+nowTime.getMinutes()+
					" "+(chatUsername.value == ""?"匿名":chatUsername.value)+
					": "+msg+"\n";
					chatDisplay.scrollTop = chatDisplay.scrollHeight;
				console.log("Send");
	}
}
*/
	
	chatBtn.style.height = "inherit";
	chatBtn.style.width = "3vw";
	chatBtn.innerText = "送出";
	chatBtn.style.borderStyle = "solid";
	chatBtn.style.borderWidth = "0.1vh";
	chatBtn.style.borderColor = "green";
	
	chatInputCtn.style.display = "flex";
	chatInputCtn.style.height = "7vh";
	chatInputCtn.style.flexDirection = "row";
	chatInputCtn.style.borderStyle = "solid";
	chatInputCtn.style.borderWidth = "0";
	chatInputCtn.style.borderColor = "green";
	
	chatCtn.appendChild(chatDisplay);
	chatCtn.appendChild(chatUsername);
	chatUserCtn.appendChild(chatUsername);
	chatUserCtn.appendChild(chatInput);
	chatInputCtn.appendChild(chatUserCtn);
	chatInputCtn.appendChild(chatBtn);
	chatCtn.appendChild(chatInputCtn);
	return chatCtn;
}

function genStyleList(){
	let styleList = document.createElement("div");
	
	let scrollStyle = document.createElement("style");
	scrollStyle.type = "text/css";
	scrollStyle.innerHTML = "html::-webkit-scrollbar {display:none;}\
	body::-webkit-scrollbar {display:auto;}";
	
	let textareaStyle = document.createElement("style");
	textareaStyle.type = "text/css";
	textareaStyle.innerHTML = "textarea{\
		-webkit-writing-mode: horizontal-tb !important;\
		text-rendering: auto;\
		color: -internal-light-dark-color(black, white);\
		letter-spacing: normal;\
		word-spacing: normal;\
		text-transform: none;\
		text-indent: 0px;\
		text-shadow: none;\
		display: inline-block;\
		text-align: start;\
		-webkit-appearance: textarea;\
		background-color: white;\
		-webkit-rtl-ordering: logical;\
		flex-direction: column;\
		resize: none;\
		cursor: text;\
		white-space: pre-wrap;\
		overflow-wrap: break-word;\
		margin: 0em;\
		font: 400 13.3333px Arial;\
		border-width: 0px;\
		border-style: none;\
		border-color: transparent;\
		border-image: none;\
		padding: 0px;}\
		\
	textarea:focus {\
		outline: none !important;\
		border:none;\
		box-shadow: 0;}";
	
	document.head.appendChild(styleList);
	styleList.appendChild(textareaStyle);
	styleList.appendChild(scrollStyle);
	//let scrollbar =window.getComputedStyle(html,"::-webkit-scrollbar");
	return styleList;
}