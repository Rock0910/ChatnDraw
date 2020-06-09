"USE RESTRICT";

window.addEventListener("load",()=>
{
	let html=document.querySelector("html");
	html.style.backgroundColor = "black";
	html.style.overflow = "hidden";
	
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
	topBtn.style.fontSize = "30px";
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
	
	let navMenu =genMenu();
	
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
});

function genElement(x,y){
	let cache =document.createElement(y);
	cache.id = x;
	
	return cache;
}

function genMenu(){
	let navMenu = genElement("navMenu","nav");
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
	
	b.addEventListener("click",()=>{
		console.log("Chat have been Clicked!");
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
	
	c.addEventListener("click",()=>{
		console.log("Paint have been Clicked!");
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
		console.log("Setting have been Clicked!");
	});
	
	a.appendChild(b);
	a.appendChild(c);
	navMenu.appendChild(a);
	navMenu.appendChild(d);
	bodyLayout.appendChild(navMenu);
	return navMenu;
}

function genBoard(){
	let paintBoardCtn = document.createElement("div");
	paintBoardCtn.style.maxHeight = "85vh";
	paintBoardCtn.style.maxWidth = "60vw";
	paintBoardCtn.style.overflow = "auto";
	let paintBoard = genElement("canvas","canvas");
	let ctx = paintBoard.getContext("2d");
	paintBoard.style.backgroundColor = "white";
	paintBoard.style.height = "85vh";
	paintBoard.style.width = "60vw";
	
	paintBoardCtn.appendChild(paintBoard);
	
	return paintBoardCtn;
}

function genChat(){
	let chatCtn = document.createElement("div");
	let chatInputCtn = document.createElement("div");
	let chatUserCtn = document.createElement("div");
	let chatDisplay = document.createElement("textarea");
	let chatUsername = document.createElement("textarea");
	let chatInput = document.createElement("textarea");
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
	chatDisplay.style.height = "79vh";
	chatDisplay.readOnly = "true";
	chatDisplay.style.width = "calc(inherit-4px)";
	chatDisplay.style.padding = "2px";
	//chatDisplay.style = "display: flex; height: 4.8vh; flex-direction: row; border-style: solid; border-width: 0.2vh 0px 0px; border-color: green;"
	
	chatUserCtn.style.width = "17vw";
	chatUserCtn.style.display = "flex";
	chatUserCtn.style.flexDirection = "column";
	chatUserCtn.style.height = "6vh";
	chatUserCtn.style.borderStyle = "solid";
	chatUserCtn.style.borderWidth = "0 0 0 0.1vh";
	chatUserCtn.style.borderColor = "green";
	
	chatUsername.style.width = "17vw";
	chatUsername.style.height = "3vh";
	chatUsername.style.backgroundColor = "gray";
	chatUsername.style.paddingLeft = "2px";
	chatUsername.style.lineHeight = "1";
	
	chatInput.style.backgroundColor = "white";
	chatInput.style.height = "inherit";
	chatInput.style.width = "17vw";
	chatInput.style.paddingLeft = "2px";
	//chatInput.style.resize = "none";
	
	chatInput.addEventListener("keydown",onEnterKeyDown);
	chatBtn.addEventListener("click",()=>{
		sendMsg();
	});
	
	function onEnterKeyDown(){
		let x = event.keyCode;
		if(x == 13 && !event.shiftKey == true){
				event.preventDefault();
				sendMsg();
		}
	}
			
	function sendMsg(){
		let msg = chatInput.value;
				if (msg != ""){
					chatInput.value = "";
					chatDisplay.value += msg+"\n";
				console.log("Send");
	}
}
	
	chatBtn.style.height = "inherit";
	chatBtn.style.width = "3vw";
	chatBtn.innerText = "送出";
	chatBtn.style.borderStyle = "solid";
	chatBtn.style.borderWidth = "0.1vh";
	chatBtn.style.borderColor = "green";
	
	chatInputCtn.style.display = "flex";
	chatInputCtn.style.height = "6vh";
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