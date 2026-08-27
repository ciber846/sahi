const products=[
 {id:1,name:"Premium Oversized T-Shirt",price:690,cat:"Fashion",emoji:"👕",badge:"NEW"},
 {id:2,name:"Wireless Bluetooth Headphone",price:1490,cat:"Electronics",emoji:"🎧",badge:"SALE"},
 {id:3,name:"Minimal Leather Backpack",price:1290,cat:"Fashion",emoji:"🎒",badge:"HOT"},
 {id:4,name:"Smart LED Desk Lamp",price:890,cat:"Home",emoji:"💡",badge:"SALE"},
 {id:5,name:"Everyday Sneakers",price:1790,cat:"Fashion",emoji:"👟",badge:"NEW"},
 {id:6,name:"Premium Skincare Set",price:1190,cat:"Beauty",emoji:"🧴",badge:"SALE"},
 {id:7,name:"Smart Watch Series X",price:2290,cat:"Electronics",emoji:"⌚",badge:"HOT"},
 {id:8,name:"Ceramic Home Mug Set",price:590,cat:"Home",emoji:"☕",badge:"NEW"}
];
let cart=JSON.parse(localStorage.getItem("kenakata-cart")||"[]");
const grid=document.getElementById("productGrid"), search=document.getElementById("searchInput");
function money(n){return "৳"+n.toLocaleString("en-BD")}
function render(list=products){
 grid.innerHTML=list.map(p=>`<article class="product-card"><div class="product-image"><span class="badge">${p.badge}</span>${p.emoji}</div><div class="product-info"><h3>${p.name}</h3><div class="stars">★★★★★ <small>(24)</small></div><div class="price">${money(p.price)}</div><button class="add-btn" onclick="addToCart(${p.id})">+ Add to Cart</button></div></article>`).join("");
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});save();openCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("kenakata-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><div class="thumb">${x.emoji}</div><div><h4>${x.name}</h4><p>${money(x.price)} × ${x.qty}</p></div><button class="remove" onclick="removeFromCart(${x.id})">✕</button></div>`).join(""):`<div style="padding:45px 20px;text-align:center;color:#777">🛒<br><br>আপনার cart এখনো খালি।</div>`;
 document.getElementById("cartTotal").textContent=money(cart.reduce((a,x)=>a+x.price*x.qty,0));
}
function openCart(){document.getElementById("cartPanel").classList.add("show");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("show");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartOpen").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.querySelectorAll(".category-card").forEach(b=>b.onclick=()=>{search.value=b.dataset.cat;filter()});
function filter(){const q=search.value.toLowerCase().trim();render(products.filter(p=>p.name.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)))}
search.addEventListener("input",filter);document.getElementById("searchBtn").onclick=filter;
document.getElementById("sortSelect").onchange=e=>{let a=[...products];if(e.target.value==="low")a.sort((x,y)=>x.price-y.price);if(e.target.value==="high")a.sort((x,y)=>y.price-x.price);render(a)};
document.getElementById("checkout").onclick=()=>cart.length?alert("Demo checkout: এখানে আপনার payment/order system connect করতে পারবেন।"):alert("Cart খালি!");
document.getElementById("newsletter").onsubmit=e=>{e.preventDefault();alert("ধন্যবাদ! Newsletter subscription demo সফল হয়েছে।");e.target.reset()};
render();renderCart();
