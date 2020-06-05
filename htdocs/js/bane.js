"USE RESTRICT";

window.addEventListener("load",()=>
{
	let html=document.querySelector("html");
	html.style.backgroundColor = "black";
	
	
	let scrollStyle = document.createElement("scrollStyle");
	scrollStyle.type = "text/css";
	scrollStyle.innerHTML = ".scrollStyle::-webkit-scrollbar {display:none;}";
	document.head.appendChild(scrollStyle);
	html.className = "scrollStyle";

	//let scrollbar =window.getComputedStyle(html,"::-webkit-scrollbar");
	
	let body = document.body;
	body.style.height = "100vh";
	body.style.width = "100vh";
	body.style.margin = "0";
	
	let topCtn = genElement("topCtn","div");
	topCtn.style.height = "10vh";
	topCtn.style.width = "100vh";
	topCtn.style.display = "flex";
	topCtn.style.justifyContent = "center";
	topCtn.style.alignItems = "center";
	topCtn.style.margin = "auto";
	//topCtn是畫面最上方的物品容器，然後調整他的style屬性
	
	let topBtn = genElement("topBtn","button");
	topBtn.innerText = "≡";
	topBtn.style.fontSize = "4vh";
	topBtn.style.textAlign = "center";
	topBtn.style.height = "5vh";
	topBtn.style.width = "5vh";
	//topBtn是在topCtn裡面的一個按鈕，改了裡面的字等屬性
	
	let topTitle = genElement("topTitle","h1");
	topTitle.innerText = "這是啥小阿~~~~";
	topTitle.style.color = "white";
	body.appendChild(topCtn);
	topCtn.appendChild(topBtn);
	topCtn.appendChild(topTitle);
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
	bodyLayout.style.height = "90vh";
	bodyLayout.style.width = "100vh";
	//bodyLayout.style.display = "flex";
	//bodyLayout.style.justifyContent = "center";
	//bodyLayout.style.alignItems = "center";
	bodyLayout.style.margin = "auto";
	body.appendChild(bodyLayout);
	
	let navMenu =genMenu();
});

function genElement(x,y){
	let cache =document.createElement(y);
	cache.id = x;
	
	return cache;
}

function genMenu(){
	let navMenu = genElement("navMenu","nav");
	navMenu.style.backgroundColor = "gray";
	navMenu.style.color = "white";
	navMenu.style.height = "vh";
	navMenu.style.width = "10vw";
	let a = document.createElement("ul");
	a.style.padding = "1vw";
	a.style.paddingTop = "2vh";
	
	let b = document.createElement("div");
	let ba = document.createElement("a");
	ba.innerText="Chat";
	ba.style.color = "inherit";
	ba.href = "#Chat";
	b.appendChild(ba);
	
	let c = document.createElement("div");
	let ca = document.createElement("a");
	ca.innerText="Paint";
	ca.style.color = "inherit";
	ca.href = "#Paint";
	c.appendChild(ca);
	
	a.appendChild(b);
	a.appendChild(c);
	navMenu.appendChild(a);
	bodyLayout.appendChild(navMenu);
	return navMenu;
}