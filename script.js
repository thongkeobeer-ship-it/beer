// ===============================
// PRODUCT DATA (50 items) - ราคาตั้งเป็น 0 ทั้งหมดก่อน (เว็บยังไม่เสร็จ)
// ===============================
const PRODUCTS = [
  {name:"PUBG Mobile", cat:"mobile", price:0, stock:0, icon:"🔫"},
  {name:"Free Fire", cat:"mobile", price:0, stock:0, icon:"🔥"},
  {name:"Mobile Legends", cat:"mobile", price:0, stock:0, icon:"⚔️"},
  {name:"Call of Duty Mobile", cat:"mobile", price:0, stock:0, icon:"🎯"},
  {name:"Genshin Impact", cat:"mobile", price:0, stock:0, icon:"💎"},
  {name:"Honkai Star Rail", cat:"mobile", price:0, stock:0, icon:"🌌"},
  {name:"Clash of Clans", cat:"mobile", price:0, stock:0, icon:"🏰"},
  {name:"Clash Royale", cat:"mobile", price:0, stock:0, icon:"👑"},
  {name:"Brawl Stars", cat:"mobile", price:0, stock:0, icon:"🌟"},
  {name:"ROV", cat:"mobile", price:0, stock:0, icon:"🛡️"},
  {name:"Wild Rift", cat:"mobile", price:0, stock:0, icon:"🏹"},
  {name:"Asphalt 9", cat:"mobile", price:0, stock:0, icon:"🏎️"},
  {name:"ROBLOX", cat:"mobile", price:0, stock:0, icon:"🧱"},
  {name:"Subway Surfers", cat:"mobile", price:0, stock:0, icon:"🚇"},
  {name:"Free Fire Max", cat:"mobile", price:0, stock:0, icon:"💥"},
  {name:"Identity V", cat:"mobile", price:0, stock:0, icon:"🎭"},
  {name:"Lords Mobile", cat:"mobile", price:0, stock:0, icon:"🏯"},
  {name:"State of Survival", cat:"mobile", price:0, stock:0, icon:"🧟"},
  {name:"Standoff 2", cat:"mobile", price:0, stock:0, icon:"🔫"},
  {name:"Speed Drifters", cat:"mobile", price:0, stock:0, icon:"🚗"},

  {name:"Steam", cat:"pc", price:0, stock:0, icon:"🕹️"},
  {name:"Valorant", cat:"pc", price:0, stock:0, icon:"🎯"},
  {name:"League of Legends RP", cat:"pc", price:0, stock:0, icon:"🐉"},
  {name:"PUBG PC", cat:"pc", price:0, stock:0, icon:"🔫"},
  {name:"CS2 Skins Credit", cat:"pc", price:0, stock:0, icon:"🔪"},
  {name:"Dota 2 Wallet", cat:"pc", price:0, stock:0, icon:"🛡️"},
  {name:"Genshin PC", cat:"pc", price:0, stock:0, icon:"💎"},
  {name:"WoW Game Time", cat:"pc", price:0, stock:0, icon:"⏳"},
  {name:"FIFA Points", cat:"pc", price:0, stock:0, icon:"⚽"},
  {name:"Apex Legends Coins", cat:"pc", price:0, stock:0, icon:"🪂"},
  {name:"Minecraft", cat:"pc", price:0, stock:0, icon:"⛏️"},
  {name:"GTA Shark Card", cat:"pc", price:0, stock:0, icon:"🦈"},
  {name:"Elden Ring DLC", cat:"pc", price:0, stock:0, icon:"🗡️"},
  {name:"Fortnite V-Bucks", cat:"pc", price:0, stock:0, icon:"🏗️"},
  {name:"Overwatch 2 Coins", cat:"pc", price:0, stock:0, icon:"🦾"},
  {name:"Rainbow Six Credits", cat:"pc", price:0, stock:0, icon:"🌈"},
  {name:"Rocket League Credits", cat:"pc", price:0, stock:0, icon:"🚀"},
  {name:"Escape from Tarkov", cat:"pc", price:0, stock:0, icon:"🎒"},
  {name:"Palworld", cat:"pc", price:0, stock:0, icon:"🐾"},
  {name:"Roblox PC", cat:"pc", price:0, stock:0, icon:"🧱"},

  {name:"Google Play Gift Card", cat:"topup", price:0, stock:0, icon:"🟢"},
  {name:"App Store Gift Card", cat:"topup", price:0, stock:0, icon:"🍎"},
  {name:"Garena Shell", cat:"topup", price:0, stock:0, icon:"🐚"},
  {name:"Razer Gold", cat:"topup", price:0, stock:0, icon:"💰"},
  {name:"iTunes Card", cat:"topup", price:0, stock:0, icon:"🎵"},
  {name:"Amazon Gift Card", cat:"topup", price:0, stock:0, icon:"📦"},
  {name:"PlayStation Wallet", cat:"topup", price:0, stock:0, icon:"🎮"},
  {name:"Xbox Gift Card", cat:"topup", price:0, stock:0, icon:"❎"},
  {name:"Nintendo eShop Card", cat:"topup", price:0, stock:0, icon:"🍄"},
  {name:"Netflix Gift Card", cat:"topup", price:0, stock:0, icon:"🎬"}
];

const GRADIENTS = [
  "linear-gradient(160deg,#33121a,#120608)",
  "linear-gradient(160deg,#3a0d16,#150408)",
  "linear-gradient(160deg,#24141a,#0d0406)"
];

let currentSort = "default";

function getSortedProducts(){
  const list = PRODUCTS.slice();
  if(currentSort === "price-asc") list.sort(function(a,b){ return a.price - b.price; });
  else if(currentSort === "price-desc") list.sort(function(a,b){ return b.price - a.price; });
  else if(currentSort === "name-asc") list.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if(currentSort === "stock-desc") list.sort(function(a,b){ return b.stock - a.stock; });
  return list;
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  const list = getSortedProducts();

  grid.innerHTML = list.map(function(p, i){
    const priceTxt = p.price.toLocaleString("de-DE");
    const dotClass = "dot-red";
    const stockTxt = "ບໍ່ພ້ອມຂາຍ";
    const sold = 0;
    const grad = GRADIENTS[i % GRADIENTS.length];

    return (
      '<div class="card" data-cat="' + p.cat + '">' +
        '<div class="card-media" style="background:' + grad + '">' +
          '<div class="card-art">' + p.icon + '</div>' +
          '<span class="badge">🔥 ຂາຍແລ້ວ ' + sold + '</span>' +
          '<span class="price-pill">' + priceTxt + ' ກີບ</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h3>🛒 ' + p.name + '</h3>' +
          '<div class="stock-line"><span class="dot ' + dotClass + '"></span> ' + stockTxt + '</div>' +
          '<button class="buy-btn" onclick="goProduct(\'' + p.name.replace(/'/g,"") + '\',' + p.price + ',' + p.stock + ')">🛒 ສັ່ງຊື້ຕອນນີ້ເລີຍ</button>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  const itemCount = document.getElementById("itemCount");
  if(itemCount) itemCount.innerText = "ເລືອກເບິ່ງສິນຄ້າ - ທັງໝົດ " + PRODUCTS.length + " ລາຍການ";
}

function handleSortChange(){
  const sel = document.getElementById("sortSelect");
  if(!sel) return;
  currentSort = sel.value;
  renderProducts();
}

// ===============================
// PROMO CAROUSEL (auto-slide 4 รูป)
// ===============================

let carouselIndex = 0;
let carouselTimer = null;

function initCarousel(){
  const track = document.getElementById("promoTrack");
  const dots = document.querySelectorAll(".promo-dot");
  if(!track) return;

  carouselTimer = setInterval(function(){
    carouselIndex = (carouselIndex + 1) % 4;
    track.style.transform = "translateX(-" + (carouselIndex * 25) + "%)";
    dots.forEach(function(d, i){ d.classList.toggle("active", i === carouselIndex); });
  }, 3000);
}

// ===============================
// MENU
// ===============================

function openMenu(){
    document.getElementById("sidebar").classList.add("show");
}
function closeMenu(){
    document.getElementById("sidebar").classList.remove("show");
}

// ===============================
// LOGIN BOX
// ===============================

let registerMode = false;

function openLogin(){
    document.getElementById("loginBox").style.display = "flex";
}
function closeLogin(){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("authMsg").innerText = "";
    document.getElementById("user").value = "";
    document.getElementById("pass").value = "";
}

function toggleAuthMode(){
    registerMode = !registerMode;
    document.getElementById("authTitle").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂົ້າສູ່ລະບົບ";
    document.getElementById("authButton").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂົ້າສູ່ລະບົບ";
    document.getElementById("authToggle").innerText = registerMode ? "ເຂົ້າສູ່ລະບົບ" : "ສະຫມັກສະມາຊິກ";
    document.getElementById("authMsg").innerText = "";

    const googleWrap = document.getElementById("googleWrap");
    if(googleWrap){
        googleWrap.style.display = registerMode ? "block" : "none";
    }
}

// ===============================
// REGISTER + LOGIN
// ===============================

async function handleAuth(){
    const email = document.getElementById("user").value.trim();
    const password = document.getElementById("pass").value;
    const msg = document.getElementById("authMsg");

    if(!email || !password){
        msg.style.color = "#ff5a5a";
        msg.innerText = "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ";
        return;
    }
    if(password.length < 6){
        msg.style.color = "#ff5a5a";
        msg.innerText = "ລະຫັດຜ່ານຕ້ອງມີຢ່າງນ້ອຍ 6 ຕົວອັກສອນ";
        return;
    }

    msg.style.color = "#999";
    msg.innerText = "ກຳລັງດຳເນີນການ...";

    if(registerMode){
        const {data, error} = await supabaseClient.auth.signUp({ email, password });
        if(error){
            msg.style.color = "#ff5a5a";
            msg.innerText = error.message;
            return;
        }
        msg.style.color = "#7dff6a";
        msg.innerText = "ສະຫມັກສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ";
        setTimeout(function(){
            registerMode = false;
            document.getElementById("authTitle").innerText = "ເຂົ້າສູ່ລະບົບ";
            document.getElementById("authButton").innerText = "ເຂົ້າສູ່ລະບົບ";
            document.getElementById("authToggle").innerText = "ສະຫມັກສະມາຊິກ";
            const googleWrap = document.getElementById("googleWrap");
            if(googleWrap) googleWrap.style.display = "none";
            msg.innerText = "";
        }, 1500);
    } else {
        const {data, error} = await supabaseClient.auth.signInWithPassword({ email, password });
        if(error){
            msg.style.color = "#ff5a5a";
            msg.innerText = "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ";
            return;
        }
        msg.style.color = "#7dff6a";
        msg.innerText = "ເຂົ້າສູ່ລະບົບສຳເລັດ";
        await updateUser();
        setTimeout(closeLogin, 700);
    }
}

async function signInWithGoogle(){
    const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin + window.location.pathname.replace(/[^/]*$/, "index.html")
        }
    });
    if(error){
        const msg = document.getElementById("authMsg");
        if(msg){
            msg.style.color = "#ff5a5a";
            msg.innerText = error.message;
        }
    }
}

// ===============================
// ACCOUNT BUTTON
// ===============================

async function handleAccountClick(){
    const {data:{user}} = await supabaseClient.auth.getUser();
    if(user){
        if(confirm("ເຂົ້າສູ່ລະບົບດ້ວຍ: " + user.email + "\n\nຕ້ອງການອອກຈາກລະບົບບໍ?")){
            await logout();
        }
    } else {
        openLogin();
    }
}

async function logout(){
    await supabaseClient.auth.signOut();
    location.reload();
}

async function updateUser(){
    const {data:{user}} = await supabaseClient.auth.getUser();
    const btn = document.getElementById("accountBtn");
    if(!btn) return;
    if(user){
        btn.style.borderColor = "#7dff6a";
        btn.title = user.email;
    } else {
        btn.style.borderColor = "#333";
        btn.title = "ເຂົ້າສູ່ລະບົບ";
    }
}

// ===============================
// BUY / GO TO PRODUCT PAGE
// ===============================

async function goProduct(name, price, stock){
    // TEMP: ปิดการบังคับล็อกอินไว้ก่อนระหว่างพัฒนาเว็บ
    // เสร็จแล้วเอา /* */ ออกเพื่อเปิดกลับคืน
    /*
    const {data:{user}} = await supabaseClient.auth.getUser();
    if(!user){
        openLogin();
        return;
    }
    */
    let url = "product.html?name=" + encodeURIComponent(name);
    if(price !== undefined) url += "&price=" + encodeURIComponent(price);
    if(stock !== undefined) url += "&stock=" + encodeURIComponent(stock);
    location.href = url;
}

// ===============================
// SEARCH
// ===============================

function filterProducts(){
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    document.querySelectorAll("#productGrid .card").forEach(function(card){
        const title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(q) ? "flex" : "none";
    });
}

// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", function(){
    renderProducts();
    updateUser();
    initCarousel();
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.addEventListener("input", filterProducts);
    const sortSelect = document.getElementById("sortSelect");
    if(sortSelect) sortSelect.addEventListener("change", handleSortChange);
});
