// ===============================
// PRODUCT DATA (50 items)
// ===============================
const PRODUCTS = [
  {name:"PUBG Mobile", cat:"mobile", price:50000, stock:128, icon:"🔫"},
  {name:"Free Fire", cat:"mobile", price:45000, stock:210, icon:"🔥"},
  {name:"Mobile Legends", cat:"mobile", price:40000, stock:300, icon:"⚔️"},
  {name:"Call of Duty Mobile", cat:"mobile", price:55000, stock:150, icon:"🎯"},
  {name:"Genshin Impact", cat:"mobile", price:89000, stock:95, icon:"💎"},
  {name:"Honkai Star Rail", cat:"mobile", price:85000, stock:80, icon:"🌌"},
  {name:"Clash of Clans", cat:"mobile", price:30000, stock:400, icon:"🏰"},
  {name:"Clash Royale", cat:"mobile", price:30000, stock:380, icon:"👑"},
  {name:"Brawl Stars", cat:"mobile", price:25000, stock:500, icon:"🌟"},
  {name:"ROV", cat:"mobile", price:70000, stock:220, icon:"🛡️"},
  {name:"Wild Rift", cat:"mobile", price:60000, stock:175, icon:"🏹"},
  {name:"Asphalt 9", cat:"mobile", price:35000, stock:260, icon:"🏎️"},
  {name:"ROBLOX", cat:"mobile", price:30000, stock:600, icon:"🧱"},
  {name:"Subway Surfers", cat:"mobile", price:20000, stock:700, icon:"🚇"},
  {name:"Free Fire Max", cat:"mobile", price:45000, stock:190, icon:"💥"},
  {name:"Identity V", cat:"mobile", price:55000, stock:60, icon:"🎭"},
  {name:"Lords Mobile", cat:"mobile", price:40000, stock:140, icon:"🏯"},
  {name:"State of Survival", cat:"mobile", price:38000, stock:130, icon:"🧟"},
  {name:"Standoff 2", cat:"mobile", price:42000, stock:110, icon:"🔫"},
  {name:"Speed Drifters", cat:"mobile", price:33000, stock:170, icon:"🚗"},

  {name:"Steam", cat:"pc", price:100000, stock:300, icon:"🕹️"},
  {name:"Valorant", cat:"pc", price:99000, stock:210, icon:"🎯"},
  {name:"League of Legends RP", cat:"pc", price:90000, stock:240, icon:"🐉"},
  {name:"PUBG PC", cat:"pc", price:95000, stock:130, icon:"🔫"},
  {name:"CS2 Skins Credit", cat:"pc", price:120000, stock:90, icon:"🔪"},
  {name:"Dota 2 Wallet", cat:"pc", price:80000, stock:100, icon:"🛡️"},
  {name:"Genshin PC", cat:"pc", price:89000, stock:95, icon:"💎"},
  {name:"WoW Game Time", cat:"pc", price:150000, stock:40, icon:"⏳"},
  {name:"FIFA Points", cat:"pc", price:110000, stock:70, icon:"⚽"},
  {name:"Apex Legends Coins", cat:"pc", price:95000, stock:85, icon:"🪂"},
  {name:"Minecraft", cat:"pc", price:120000, stock:60, icon:"⛏️"},
  {name:"GTA Shark Card", cat:"pc", price:130000, stock:75, icon:"🦈"},
  {name:"Elden Ring DLC", cat:"pc", price:200000, stock:30, icon:"🗡️"},
  {name:"Fortnite V-Bucks", cat:"pc", price:90000, stock:220, icon:"🏗️"},
  {name:"Overwatch 2 Coins", cat:"pc", price:100000, stock:65, icon:"🦾"},
  {name:"Rainbow Six Credits", cat:"pc", price:95000, stock:50, icon:"🌈"},
  {name:"Rocket League Credits", cat:"pc", price:70000, stock:140, icon:"🚀"},
  {name:"Escape from Tarkov", cat:"pc", price:250000, stock:20, icon:"🎒"},
  {name:"Palworld", cat:"pc", price:180000, stock:45, icon:"🐾"},
  {name:"Roblox PC", cat:"pc", price:30000, stock:500, icon:"🧱"},

  {name:"Google Play Gift Card", cat:"topup", price:100000, stock:300, icon:"🟢"},
  {name:"App Store Gift Card", cat:"topup", price:100000, stock:280, icon:"🍎"},
  {name:"Garena Shell", cat:"topup", price:50000, stock:400, icon:"🐚"},
  {name:"Razer Gold", cat:"topup", price:90000, stock:150, icon:"💰"},
  {name:"iTunes Card", cat:"topup", price:100000, stock:190, icon:"🎵"},
  {name:"Amazon Gift Card", cat:"topup", price:120000, stock:100, icon:"📦"},
  {name:"PlayStation Wallet", cat:"topup", price:150000, stock:80, icon:"🎮"},
  {name:"Xbox Gift Card", cat:"topup", price:150000, stock:70, icon:"❎"},
  {name:"Nintendo eShop Card", cat:"topup", price:130000, stock:90, icon:"🍄"},
  {name:"Netflix Gift Card", cat:"topup", price:100000, stock:60, icon:"🎬"}
];

const GRADIENTS = [
  "linear-gradient(160deg,#33121a,#120608)",
  "linear-gradient(160deg,#3a0d16,#150408)",
  "linear-gradient(160deg,#24141a,#0d0406)"
];

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  grid.innerHTML = PRODUCTS.map(function(p, i){
    const priceTxt = p.price.toLocaleString("de-DE");
    const inStock = p.stock > 0;
    const dotClass = inStock ? "dot-green" : "dot-red";
    const stockTxt = inStock ? ("ພ້ອມຂາຍ · ເຫຼືອ " + p.stock + " ອັນ") : "ສິນຄ້າໝົດ";
    const sold = Math.max(0, 600 - p.stock);
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
          '<button class="buy-btn" ' + (inStock ? '' : 'disabled') + ' onclick="goProduct(\'' + p.name.replace(/'/g,"") + '\',' + p.price + ',' + p.stock + ')">🛒 ສັ່ງຊື້ຕອນນີ້ເລີຍ</button>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  const itemCount = document.getElementById("itemCount");
  if(itemCount) itemCount.innerText = "ເລືອກເບິ່ງສິນຄ້າ - ທັງໝົດ " + PRODUCTS.length + " ລາຍການ";
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
    const {data:{user}} = await supabaseClient.auth.getUser();
    if(!user){
        openLogin();
        return;
    }
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
// CATEGORY CHIPS
// ===============================

function initCategoryFilter(){
    document.querySelectorAll(".chip").forEach(function(chip){
        chip.addEventListener("click", function(){
            document.querySelectorAll(".chip").forEach(function(c){ c.classList.remove("active"); });
            chip.classList.add("active");
            const cat = chip.dataset.cat;
            document.querySelectorAll("#productGrid .card").forEach(function(card){
                const cats = card.dataset.cat || "";
                card.style.display = (cat === "all" || cats.includes(cat)) ? "flex" : "none";
            });
        });
    });
}

function scrollCats(dir){
    document.getElementById("catChips").scrollLeft += dir * 150;
}

// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", function(){
    renderProducts();
    updateUser();
    initCategoryFilter();
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.addEventListener("input", filterProducts);
});
