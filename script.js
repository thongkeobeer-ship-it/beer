// ===============================
// PRODUCT DATA (50 items) - ราคาตั้งเป็น 0 ทั้งหมดก่อน (เว็บยังไม่เสร็จ)
// แบ่งเป็น 5 หมวดหมู่ x 10 รายการ
// ===============================
const PRODUCTS = [
  // ===== มือถือ - Battle/Shooter (10) =====
  {name:"PUBG Mobile", cat:"mobile-battle", price:10, stock:0, icon:"🔫"},
  {name:"Free Fire", cat:"mobile-battle", price:0, stock:0, icon:"🔥"},
  {name:"Free Fire Max", cat:"mobile-battle", price:0, stock:0, icon:"💥"},
  {name:"Mobile Legends", cat:"mobile-battle", price:0, stock:0, icon:"⚔️"},
  {name:"Call of Duty Mobile", cat:"mobile-battle", price:0, stock:0, icon:"🎯"},
  {name:"ROV", cat:"mobile-battle", price:0, stock:0, icon:"🛡️"},
  {name:"Wild Rift", cat:"mobile-battle", price:0, stock:0, icon:"🏹"},
  {name:"Standoff 2", cat:"mobile-battle", price:0, stock:0, icon:"🔫"},
  {name:"Clash Royale", cat:"mobile-battle", price:0, stock:0, icon:"👑"},
  {name:"Brawl Stars", cat:"mobile-battle", price:0, stock:0, icon:"🌟"},

  // ===== มือถือ - อื่นๆ (10) =====
  {name:"Genshin Impact", cat:"mobile-casual", price:0, stock:0, icon:"💎"},
  {name:"Honkai Star Rail", cat:"mobile-casual", price:0, stock:0, icon:"🌌"},
  {name:"Clash of Clans", cat:"mobile-casual", price:0, stock:0, icon:"🏰"},
  {name:"Asphalt 9", cat:"mobile-casual", price:0, stock:0, icon:"🏎️"},
  {name:"ROBLOX", cat:"mobile-casual", price:0, stock:0, icon:"🧱"},
  {name:"Subway Surfers", cat:"mobile-casual", price:0, stock:0, icon:"🚇"},
  {name:"Identity V", cat:"mobile-casual", price:0, stock:0, icon:"🎭"},
  {name:"Lords Mobile", cat:"mobile-casual", price:0, stock:0, icon:"🏯"},
  {name:"State of Survival", cat:"mobile-casual", price:0, stock:0, icon:"🧟"},
  {name:"Speed Drifters", cat:"mobile-casual", price:0, stock:0, icon:"🚗"},

  // ===== พีซี - Shooter/Action (10) =====
  {name:"Valorant", cat:"pc-shooter", price:0, stock:0, icon:"🎯"},
  {name:"PUBG PC", cat:"pc-shooter", price:0, stock:0, icon:"🔫"},
  {name:"CS2 Skins Credit", cat:"pc-shooter", price:0, stock:0, icon:"🔪"},
  {name:"Apex Legends Coins", cat:"pc-shooter", price:0, stock:0, icon:"🪂"},
  {name:"Overwatch 2 Coins", cat:"pc-shooter", price:0, stock:0, icon:"🦾"},
  {name:"Rainbow Six Credits", cat:"pc-shooter", price:0, stock:0, icon:"🌈"},
  {name:"Escape from Tarkov", cat:"pc-shooter", price:0, stock:0, icon:"🎒"},
  {name:"Fortnite V-Bucks", cat:"pc-shooter", price:0, stock:0, icon:"🏗️"},
  {name:"Rocket League Credits", cat:"pc-shooter", price:0, stock:0, icon:"🚀"},
  {name:"Palworld", cat:"pc-shooter", price:0, stock:0, icon:"🐾"},

  // ===== พีซี - อื่นๆ (10) =====
  {name:"Steam", cat:"pc-other", price:0, stock:0, icon:"🕹️"},
  {name:"League of Legends RP", cat:"pc-other", price:0, stock:0, icon:"🐉"},
  {name:"Dota 2 Wallet", cat:"pc-other", price:0, stock:0, icon:"🛡️"},
  {name:"Genshin PC", cat:"pc-other", price:0, stock:0, icon:"💎"},
  {name:"WoW Game Time", cat:"pc-other", price:0, stock:0, icon:"⏳"},
  {name:"FIFA Points", cat:"pc-other", price:0, stock:0, icon:"⚽"},
  {name:"Minecraft", cat:"pc-other", price:0, stock:0, icon:"⛏️"},
  {name:"GTA Shark Card", cat:"pc-other", price:0, stock:0, icon:"🦈"},
  {name:"Elden Ring DLC", cat:"pc-other", price:0, stock:0, icon:"🗡️"},
  {name:"Roblox PC", cat:"pc-other", price:0, stock:0, icon:"🧱"},

  // ===== บัตรเติมเงิน (10) =====
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

// แปลงชื่อสินค้าเป็นชื่อไฟล์รูป เช่น "PUBG Mobile" -> "pubg-mobile"
function slugify(name){
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

let currentSort = "default";
let currentCategory = "all";
let currentSearch = "";
let soldCounts = {};

function getFilteredProducts(){
  let list = PRODUCTS.slice();

  if(currentCategory !== "all"){
    list = list.filter(function(p){ return p.cat === currentCategory; });
  }

  if(currentSearch){
    list = list.filter(function(p){ return p.name.toLowerCase().includes(currentSearch); });
  }

  if(currentSort === "price-asc") list.sort(function(a,b){ return a.price - b.price; });
  else if(currentSort === "price-desc") list.sort(function(a,b){ return b.price - a.price; });
  else if(currentSort === "name-asc") list.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if(currentSort === "stock-desc") list.sort(function(a,b){ return b.stock - a.stock; });

  return list;
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  const list = getFilteredProducts();

  grid.innerHTML = list.map(function(p, i){
    const priceTxt = p.price.toLocaleString("de-DE");
    const inStock = p.stock > 0;
    const dotClass = inStock ? "dot-green" : "dot-red";
    const stockTxt = inStock ? ("ພ້ອມຂາຍ · ເຫຼືອ " + p.stock) : "ບໍ່ພ້ອມຂາຍ";
    const sold = soldCounts[p.name] || 0;
    const grad = GRADIENTS[i % GRADIENTS.length];
    const disabledAttr = inStock ? "" : "disabled";
    const imgPath = "img/products/" + slugify(p.name) + ".jpg";

    return (
      '<div class="card" data-cat="' + p.cat + '">' +
        '<div class="card-media" style="background:' + grad + '">' +
          '<div class="card-art">' + p.icon + '</div>' +
          '<img class="card-img" src="' + imgPath + '" alt="' + p.name + '" onerror="this.style.display=\'none\'">' +
          '<span class="badge">🔥 ຂາຍແລ້ວ ' + sold + '</span>' +
          '<span class="price-pill">' + priceTxt + ' ກີບ</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<h3>🛒 ' + p.name + '</h3>' +
          '<div class="stock-line"><span class="dot ' + dotClass + '"></span> ' + stockTxt + '</div>' +
          '<button class="buy-btn" ' + disabledAttr + ' onclick="goProduct(\'' + p.name.replace(/'/g,"") + '\',' + p.price + ',' + p.stock + ')">🛒 ສັ່ງຊື້ຕອນນີ້ເລີຍ</button>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  const itemCount = document.getElementById("itemCount");
  if(itemCount) itemCount.innerText = "ເລືອກເບິ່ງສິນຄ້າ - ສະແດງ " + list.length + " ຈາກ " + PRODUCTS.length + " ລາຍການ";
}

function handleSortChange(){
  const sel = document.getElementById("sortSelect");
  if(!sel) return;
  currentSort = sel.value;
  renderProducts();
}

// ===============================
// ดึงยอด "ขายแล้ว" จริงจากออเดอร์ที่ยืนยันแล้ว
// ===============================
async function loadSoldCounts(){
  const { data, error } = await supabaseClient.rpc("get_sold_counts");

  if(error){
    console.error("[loadSoldCounts] error:", error);
    return;
  }

  soldCounts = {};
  (data || []).forEach(function(row){
    soldCounts[row.product_name] = Number(row.total_qty) || 0;
  });

  renderProducts();
}

// ===============================
// ดึงจำนวนรหัสคงเหลือจากคลัง (stock_codes) มาอัปเดตสต็อกจริง
// ===============================
async function loadStockFromSupabase(){
  const { data, error } = await supabaseClient
    .from("stock_codes")
    .select("product_name, status")
    .eq("status", "available");

  if(error){
    console.error("[loadStockFromSupabase] error:", error);
    return;
  }

  const counts = {};
  (data || []).forEach(function(row){
    counts[row.product_name] = (counts[row.product_name] || 0) + 1;
  });

  PRODUCTS.forEach(function(p){
    p.stock = counts[p.name] || 0;
  });

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
// หมวดหมู่ (category chips)
// ===============================

function initCategoryChips(){
  const chips = document.querySelectorAll(".chip");
  chips.forEach(function(chip){
    chip.addEventListener("click", function(){
      chips.forEach(function(c){ c.classList.remove("active"); });
      this.classList.add("active");
      currentCategory = this.dataset.cat;
      renderProducts();
    });
  });
}

function scrollCats(direction){
  const row = document.getElementById("catChips");
  if(row){
    row.scrollBy({ left: direction * 150, behavior: "smooth" });
  }
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
    if(btn){
        if(user){
            btn.style.borderColor = "#7dff6a";
            btn.title = user.email;
        } else {
            btn.style.borderColor = "#333";
            btn.title = "ເຂົ້າສູ່ລະບົບ";
        }
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
    currentSearch = document.getElementById("searchInput").value.trim().toLowerCase();
    renderProducts();
}

// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", function(){
    renderProducts();
    loadStockFromSupabase();
    loadSoldCounts();
    updateUser();
    initCarousel();
    initCategoryChips();
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.addEventListener("input", filterProducts);
    const sortSelect = document.getElementById("sortSelect");
    if(sortSelect) sortSelect.addEventListener("change", handleSortChange);
});
