"USE RESTRICT";

window.addEventListener("load",()=>
{
	let html=document.querySelector("html");
	html.style.backgroundColor = "black";
	
	let topLayout = genElement("topLayout","div");
	topLayout.style.height = "10vh";
	topLayout.style.width = "100vh";
	topLayout.style.display = "flex";
	topLayout.style.justifyContent = "center";
	topLayout.style.alignItems = "center";
	topLayout.style.margin = "auto";
	document.body.appendChild(topLayout);
	
	let navMenu =genMenu();
	
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
	topLayout.appendChild(topCtn);
	topCtn.appendChild(topBtn);
	topCtn.appendChild(topTitle);
	//topTitle是在topCtn裡面的文字，使用了h1的屬性
	
	topBtn.addEventListener("click",()=>
	{
		if(document.querySelector("#navMenu"))
		{
			topLayout.removeChild(document.querySelector("#navMenu"));
		}
		else
		{
			let x =document.querySelector("#topCtn");
			topLayout.insertBefore(navMenu,x);
		}
	});
});

function genElement(x,y){
	let cache =document.createElement(y);
	cache.id = x;
	
	return cache;
}

function genMenu(){
	let navMenu = genElement("navMenu","nav");
	navMenu.style.color = "white";
	let a = document.createElement("ul");
	
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
	topLayout.appendChild(navMenu);
	return navMenu;
}