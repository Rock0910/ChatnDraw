"USE RESTRICT";

window.addEventListener("load",()=>
{
	let html=document.querySelector("html");
	html.style.backgroundColor = "black";
	html.style.overflow = "hidden";
	
	let styleList = document.createElement("div");
	let scrollStyle = document.createElement("style");
	scrollStyle.type = "text/css";
	scrollStyle.innerHTML = "html::-webkit-scrollbar {display:none;}";
	document.head.appendChild(styleList);
	styleList.appendChild(scrollStyle);
	
	//let scrollbar =window.getComputedStyle(html,"::-webkit-scrollbar");
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
	mainBoard.style.backgroundColor = "gray";
	mainBoard.style.height = "85vh";
	mainBoard.style.width = "80vw";
	mainBoard.style.marginLeft = "3vw";
	mainBoard.style.marginRight = "3vw";
	
	bodyLayout.appendChild(mainBoard);
});

function genElement(x,y){
	let cache =document.createElement(y);
	cache.id = x;
	
	return cache;
}

function genMenu(){
	let navMenu = genElement("navMenu","nav");
	navMenu.style.display = "flex";
	navMenu.style.flexDirection = "column";
	navMenu.style.justifyContent = "space-between";
	navMenu.style.alignContent = "space-between";
	navMenu.style.backgroundColor = "gray";
	navMenu.style.color = "white";
	navMenu.style.height = "85vh";
	navMenu.style.width = "10vw";
	navMenu.style.outlineWidth = "1vh";
	
	let a = document.createElement("ul");
	a.style.display = "flex";
	a.style.justifyContent = "center";
	a.style.flexDirection = "column";
	a.style.padding = "0vw";
	//a.style.paddingTop = "2vh";
	a.style.fontSize = "2vw";
	
	let b = document.createElement("div");
	b.innerText="Chat";
	b.style.color = "inherit";
	b.style.textDecoration = "underline";
	b.style.textAlign = "center";
	b.style.fontSize = "2vw";
	/*let ba = document.createElement("a");
	ba.innerText="Chat";
	ba.style.color = "inherit";
	ba.href = "#Chat";
	b.appendChild(ba);*/
	
	let c = document.createElement("div");
	c.innerText="Paint";
	c.style.color = "inherit";
	c.style.textDecoration = "underline";
	c.style.textAlign = "center";
	/*let ca = document.createElement("a");
	ca.innerText="Paint";
	ca.style.color = "inherit";
	ca.href = "#Paint";
	c.appendChild(ca);*/
	
	let d = document.createElement("div");
	d.innerText="Setting";
	d.style.color = "inherit";
	d.style.textDecoration = "underline";
	d.style.textAlign = "center";
	d.style.padding = "1vw";
	d.style.paddingBottom = "4vh";
	d.style.fontSize = "2vw";
	
	a.appendChild(b);
	a.appendChild(c);
	navMenu.appendChild(a);
	navMenu.appendChild(d);
	bodyLayout.appendChild(navMenu);
	return navMenu;
}