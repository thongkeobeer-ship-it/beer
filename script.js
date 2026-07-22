// ===============================
// PRODUCT DATA (20 items) - ราคาตั้งเป็น 0 ทั้งหมดก่อน (เว็บยังไม่เสร็จ)
// ===============================
const PRODUCTS = [
  {name:"PROXY-UID", cat:"mobile-battle", price:0, stock:0, icon:"🔫"},
  {name:"PROXY-RM", cat:"mobile-battle", price:0, stock:0, icon:"🔥"},
  {name:"PROXY-B-GOD", cat:"mobile-battle", price:0, stock:0, icon:"💥"},
  {name:"PROXY-VIP", cat:"mobile-battle", price:0, stock:0, icon:"⚔️"},
  {name:"DRIP-ANDROID", cat:"mobile-battle", price:0, stock:0, icon:"🎯"},
  {name:"HG-CHEATS", cat:"mobile-battle", price:0, stock:0, icon:"🛡️"},
  {name:"DRIP-PROXY", cat:"mobile-battle", price:0, stock:0, icon:"🏹"},
  {name:"PROXY AD", cat:"mobile-battle", price:0, stock:0, icon:"🔫"},
  {name:"PROXY-X2", cat:"mobile-battle", price:0, stock:0, icon:"👑"},
  {name:"PROXY-NABEE", cat:"mobile-battle", price:0, stock:0, icon:"🌟"},

  {name:"ยังไม่มีชื่อสินค้าที่จะขาย", cat:"mobile-casual", price:0, stock:0, icon:"💎"},
  {name:"ยังไม่มีชื่อสินค้าที่จะขาย", cat:"mobile-casual", price:0, stock:0, icon:"🌌"},
  {name:"ยังไม่มีชื่อสินค้าที่จะขาย", cat:"mobile-casual", price:0, stock:0, icon:"🏰"},
  {name:"ยังไม่มีชื่อสินค้าที่จะขาย", cat:"mobile-casual", price:0, stock:0, icon:"🏎️"},
  {name:"GBOX IOS", cat:"mobile-casual", price:0, stock:0, icon:"🧱"},
  {name:"𝐃𝐄𝐀𝐓𝐇-𝐌𝐎𝐃", cat:"mobile-casual", price:0, stock:0, icon:"🚇"},
  {name:"IDENTIC IOS", cat:"mobile-casual", price:0, stock:0, icon:"🎭"},
  {name:"𝐅𝐈𝐮𝐨𝐫𝐢𝐭𝐞-𝐈𝐎𝐒", cat:"mobile-casual", price:0, stock:0, icon:"🏯"},
  {name:"APP-CODE-IOS-Lv8-30", cat:"mobile-casual", price:0, stock:0, icon:"🧟"},
  {name:"APP-CODE-AD-Lv8-30", cat:"mobile-casual", price:0, stock:0, icon:"🚗"}
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
let currentSearch = "";
let soldCounts = {};

function getFilteredProducts(){
  let list = PRODUCTS.slice();

  if(currentSearch){
    list = list.filter(function(p){ return p.name.toLowerCase().includes(currentSearch); });
  }

  if(currentSort === "price-asc") list.sort(function(a,b){ return a.price - b.price; });
  else if(currentSort === "price-desc") list.sort(function(a,b){ return b.price - a.price; });
  else if(currentSort === "name-asc") list.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if(currentSort === "stock-desc") list.sort(function(a,b){ return b.stock - a.stock; });

  return list;
}

// ===============================
// ===============================
// ດຶງລາຄາ/ຊື່ສະແດງ/ຄຳບັນຍາຍ ທີ່ແອດມິນຕັ້ງໄວ້ (product_overrides)
// ===============================
async function loadProductOverrides(){
  const { data, error } = await supabaseClient
    .from("product_overrides")
    .select("product_name, display_name, price, description, is_closed, close_note");

  if(error){
    console.error("[loadProductOverrides] error:", error);
    return;
  }

  const map = {};
  (data || []).forEach(function(row){ map[row.product_name] = row; });

  PRODUCTS.forEach(function(p){
    const o = map[p.name];
    p.displayName = (o && o.display_name) ? o.display_name : p.name;
    p.description = (o && o.description) ? o.description : "";
    if(o && o.price !== null && o.price !== undefined) p.price = Number(o.price);
    p.isClosed = !!(o && o.is_closed);
    p.closeNote = (o && o.close_note) ? o.close_note : "";
  });

  renderProducts();
}

// ===============================
// ດຶງຮູບພາບສິນຄ້າທີ່ແອດມິນອັບໂຫລດໄວ້ (product_images)
// ===============================
async function loadProductImages(){
  const { data, error } = await supabaseClient
    .from("product_images")
    .select("product_name, image_url");

  if(error){
    console.error("[loadProductImages] error:", error);
    return;
  }

  const map = {};
  (data || []).forEach(function(row){ map[row.product_name] = row.image_url; });

  PRODUCTS.forEach(function(p){
    p.imageUrl = map[p.name] || "";
  });

  renderProducts();
}

// ===============================
// ສ່ວນຫຼຸດຕົວແທນ — ດຶງ % ຂອງຜູ້ໃຊ້ທີ່ລ໋ອກອິນຢູ່ (0 ຖ້າບໍ່ແມ່ນຕົວແທນ/ຍັງບໍ່ໄດ້ລ໋ອກອິນ)
// ===============================
let agentDiscountPercent = 0;
async function loadAgentDiscountForList(){
  try{
    const { data, error } = await supabaseClient.rpc("get_my_discount");
    if(!error && data !== null && data !== undefined){
      agentDiscountPercent = Number(data) || 0;
      renderProducts();
    }
  }catch(e){
    console.error("[loadAgentDiscountForList] error:", e);
  }
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  if(!grid) return;

  const list = getFilteredProducts();

  grid.innerHTML = list.map(function(p, i){
    const displayPrice = agentDiscountPercent > 0
      ? Math.max(0, p.price - Math.round(p.price * agentDiscountPercent / 100))
      : p.price;
    const priceTxt = displayPrice.toLocaleString("de-DE") +
      (agentDiscountPercent > 0 ? (' <span style="font-size:10px;opacity:.85;">(-' + agentDiscountPercent + '%)</span>') : "");
    const inStock = p.stock > 0;
    const isClosed = !!p.isClosed;
    const dotClass = isClosed ? "dot-red" : (inStock ? "dot-green" : "dot-red");
    const stockTxt = isClosed ? "ປິດຊົ່ວຄາວ" : (inStock ? ("ພ້ອມຂາຍ · ເຫຼືອ " + p.stock) : "ບໍ່ພ້ອມຂາຍ");
    const sold = soldCounts[p.name] || 0;
    const grad = GRADIENTS[i % GRADIENTS.length];
    const disabledAttr = (isClosed || !inStock) ? "disabled" : "";
    const buyBtnTxt = isClosed ? "🚫 ປິດຊົ່ວຄາວ" : "🛒 ສັ່ງຊື້ຕອນນີ້ເລີຍ";
    const imgPath = p.imageUrl || ("img/products/" + slugify(p.name) + ".jpg");
    const shownName = p.displayName || p.name;
    const closedRibbon = isClosed ? '<div class="closed-ribbon">ປິດຊົ່ວຄາວ</div>' : "";
    const closedNote = (isClosed && p.closeNote) ? ('<div class="closed-note">⚠️ ' + p.closeNote + '</div>') : "";

    return (
      '<div class="card' + (isClosed ? ' card-closed' : '') + '" data-cat="' + p.cat + '">' +
        '<div class="card-media" style="background:' + grad + '">' +
          '<div class="card-art">' + p.icon + '</div>' +
          '<img class="card-img" src="' + imgPath + '" alt="' + shownName + '" onerror="this.style.display=\'none\'">' +
          closedRibbon +
        '</div>' +
        '<div class="card-body">' +
          '<h3>🛒 ' + shownName + '</h3>' +
          '<div class="stock-line"><span class="dot ' + dotClass + '"></span> ' + stockTxt + '</div>' +
          closedNote +
          '<div class="card-meta-row">' +
            '<span class="price-pill-inline">' + priceTxt + ' ກີບ</span>' +
            '<span class="badge-inline">🔥 ຂາຍແລ້ວ ' + sold + '</span>' +
          '</div>' +
          '<button class="buy-btn" ' + disabledAttr + ' onclick="goProduct(\'' + p.name.replace(/'/g,"") + '\',' + p.price + ',' + p.stock + ',\'' + shownName.replace(/'/g,"") + '\',\'' + p.cat + '\',\'' + imgPath.replace(/'/g,"") + '\')">' + buyBtnTxt + '</button>' +
        '</div>' +
      '</div>'
    );
  }).join("");

  const itemCount = document.getElementById("itemCount");
  if(itemCount) itemCount.innerText = "ເລືອກເບິ່ງສິນຄ້າ - ສະແດງ " + list.length + " ຈາກ " + PRODUCTS.length + " ລາຍການ";

  initScrollReveal();
}

// ===============================
// ค่อยๆเผยสินค้าทีละ 2 ใบตอนเลื่อนดู
// ===============================
let revealObserver = null;
const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initScrollReveal(){
  const cards = Array.from(document.querySelectorAll("#productGrid .card"));
  if(cards.length === 0) return;

  if(prefersReducedMotion){
    cards.forEach(function(card){ card.classList.add("reveal-visible"); });
    return;
  }

  // จับกลุ่มการ์ดทีละ 2 ใบ ให้ทั้งคู่โผล่มาพร้อมกันเสมอ ไม่ว่ากริดจะกี่คอลัมน์
  const pairs = [];
  for(let i = 0; i < cards.length; i += 2){
    pairs.push(cards.slice(i, i + 2));
  }

  cards.forEach(function(card){ card.classList.add("reveal-hidden"); });

  if(revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      const pair = pairs.find(function(p){ return p.indexOf(entry.target) !== -1; });
      if(!pair) return;
      pair.forEach(function(card, idx){
        card.style.transitionDelay = (idx * 110) + "ms";
        card.classList.add("reveal-visible");
        revealObserver.unobserve(card);
      });
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

  cards.forEach(function(card){ revealObserver.observe(card); });
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

  // ชื่อรหัสในคลังของสินค้าที่มีตัวเลือกระยะเวลา จะถูกเก็บเป็น
  // "ชื่อสินค้า [1d]", "ชื่อสินค้า [7d]" ฯลฯ ไม่ใช่ชื่อตรงตัว
  // เลยต้องรวมสต็อกของทุก variant เข้ากับชื่อฐานตอนเช็คว่า "พร้อมขาย" ไหม
  //
  // สำคัญ: ต้องใช้รายการคีย์ระยะเวลาชุดเดียวกับที่ product.html ใช้เช็คตอนซื้อ
  // (loadDurationStockCounts) ทุกประการ ห้ามนับแบบเดา prefix แบบหลวมๆ
  // ไม่งั้นถ้ามีรหัสค้างในคลังที่ตั้งชื่อคีย์เพี้ยน/ไม่ตรง 6 แบบนี้ หน้ารายการ
  // จะนับว่ายังพร้อมขาย ทั้งที่หน้าซื้อจริงหาไม่เจอและขึ้นว่าหมดแล้ว
  const DURATION_KEYS = ["12h","1d","3d","7d","15d","30d"];

  PRODUCTS.forEach(function(p){
    let total = counts[p.name] || 0;
    DURATION_KEYS.forEach(function(k){
      total += counts[p.name + " [" + k + "]"] || 0;
    });
    p.stock = total;
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
// LOGIN BOX
// ===============================

let registerMode = false;

function openLogin(){
    document.getElementById("loginBox").style.display = "flex";
    applyAuthModeUI();
}
function closeLogin(){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("authMsg").innerText = "";
    document.getElementById("user").value = "";
    document.getElementById("pass").value = "";
    document.getElementById("passConfirm").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("agreeTerms").checked = false;
}

function togglePw(id, el){
    const input = document.getElementById(id);
    if(input.type === "password"){
        input.type = "text";
        el.style.opacity = 1;
    } else {
        input.type = "password";
        el.style.opacity = .55;
    }
}

function applyAuthModeUI(){
    document.getElementById("authTitle").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂົ້າສູ່ລະບົບ";
    document.getElementById("authButton").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂົ້າສູ່ລະບົບ";
    document.getElementById("authToggle").innerText = registerMode ? "ມີບັນຊີຢູ່ແລ້ວ? ເຂົ້າສູ່ລະບົບ" : "ຍັງບໍ່ມີບັນຊີ? ສະຫມັກສະມາຊິກ";
    document.getElementById("authSubLink").innerText = registerMode ? "ເຂົ້າສູ່ລະບົບທີ່ນີ້" : "ສະຫມັກສະມາຊິກທີ່ນີ້";
    document.getElementById("authMsg").innerText = "";

    document.getElementById("nameGroup").style.display = registerMode ? "block" : "none";
    document.getElementById("confirmGroup").style.display = registerMode ? "block" : "none";
    document.getElementById("termsGroup").style.display = registerMode ? "flex" : "none";

    const googleWrap = document.getElementById("googleWrap");
    if(googleWrap){
        googleWrap.style.display = "block";
    }
}

function toggleAuthMode(){
    registerMode = !registerMode;
    applyAuthModeUI();
}

// ===============================
// REGISTER + LOGIN
// ===============================

async function handleAuth(){
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("user").value.trim();
    const password = document.getElementById("pass").value;
    const passwordConfirm = document.getElementById("passConfirm").value;
    const msg = document.getElementById("authMsg");

    if(registerMode && !fullName){
        msg.style.color = "#ff5a5a";
        msg.innerText = "ກະລຸນາປ້ອນຊື່ຂອງທ່ານ";
        return;
    }
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
    if(registerMode && password !== passwordConfirm){
        msg.style.color = "#ff5a5a";
        msg.innerText = "ລະຫັດຜ່ານທັງສອງບໍ່ກົງກັນ";
        return;
    }
    if(registerMode && !document.getElementById("agreeTerms").checked){
        msg.style.color = "#ff5a5a";
        msg.innerText = "ກະລຸນາຍອມຮັບເງື່ອນໄຂການໃຊ້ງານກ່ອນ";
        return;
    }

    msg.style.color = "#999";
    msg.innerText = "ກຳລັງດຳເນີນການ...";

    if(registerMode){
        const {data, error} = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } }
        });
        if(error){
            msg.style.color = "#ff5a5a";
            msg.innerText = error.message;
            return;
        }
        msg.style.color = "#7dff6a";
        msg.innerText = "ສະຫມັກສຳເລັດ! ກະລຸນາເຂົ້າສູ່ລະບົບ";
        setTimeout(function(){
            registerMode = false;
            applyAuthModeUI();
            msg.innerText = "";
        }, 1500);
    } else {
        const {data, error} = await supabaseClient.auth.signInWithPassword({ email, password });
        if(error){
            msg.style.color = "#ff5a5a";
            if(error.message && error.message.toLowerCase().includes("email not confirmed")){
                msg.innerText = "ຍັງບໍ່ໄດ້ຢືນຢັນອີເມວ ກະລຸນາຕິດຕໍ່ແອດມິນ";
            } else if(error.message && error.message.toLowerCase().includes("invalid login credentials")){
                msg.innerText = "ອີເມວ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ";
            } else {
                msg.innerText = error.message || "ເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ";
            }
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
    await refreshWalletUI();
}

// ===============================
// กระเป๋าเงิน (WALLET)
// ===============================

async function refreshWalletUI(){
    const walletBtn = document.getElementById("walletBtn");
    if(!walletBtn) return;

    const {data:{user}} = await supabaseClient.auth.getUser();
    if(!user){
        walletBtn.style.display = "none";
        return;
    }

    await supabaseClient.rpc("ensure_wallet");

    const {data, error} = await supabaseClient
        .from("wallets")
        .select("balance")
        .eq("user_id", user.id)
        .maybeSingle();

    walletBtn.style.display = "flex";
    const txt = document.getElementById("walletBalanceTxt");
    if(txt){
        const bal = (!error && data) ? Number(data.balance) : 0;
        txt.innerText = bal.toLocaleString("de-DE") + " ກີບ";
    }
}

function handleWalletClick(){
    location.href = "topup.html";
}

// ===============================
// BUY / GO TO PRODUCT PAGE
// ===============================

async function goProduct(name, price, stock, displayName, cat, imageUrl){
    const {data:{user}} = await supabaseClient.auth.getUser();
    if(!user){
        openLogin();
        return;
    }
    let url = "product.html?name=" + encodeURIComponent(name);
    if(price !== undefined) url += "&price=" + encodeURIComponent(price);
    if(stock !== undefined) url += "&stock=" + encodeURIComponent(stock);
    if(displayName) url += "&dn=" + encodeURIComponent(displayName);
    if(cat) url += "&cat=" + encodeURIComponent(cat);
    if(imageUrl) url += "&img=" + encodeURIComponent(imageUrl);
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
// ຄົນອອນລາຍ (Presence) — ໃຫ້ໜ້າ admin ນັບຄົນທີ່ກຳລັງໃຊ້ງານເວັບຢູ່ຕອນນີ້
// ທຸກໜ້າຝັ່ງລູກຄ້າທີ່ໂຫລດ script.js ຈະ track ຕົວເອງເຂົ້າ channel ດຽວກັນ "online-users"
// ===============================
let presenceChannel = null;
function initPresenceTracking(){
    if(presenceChannel) return;

    const visitorKey = "visitor-" + Math.random().toString(36).slice(2) + "-" + Date.now();

    presenceChannel = supabaseClient.channel("online-users", {
        config: { presence: { key: visitorKey } }
    });

    presenceChannel.subscribe(async function(status){
        if(status === "SUBSCRIBED"){
            await presenceChannel.track({ online_at: new Date().toISOString() });
        }
    });

    // ຢຸດ track ຕອນປິດ/ອອກຈາກໜ້າ ເພື່ອບໍ່ໃຫ້ນັບຄົນທີ່ອອກໄປແລ້ວ
    window.addEventListener("beforeunload", function(){
        if(presenceChannel) supabaseClient.removeChannel(presenceChannel);
    });
}

// ===============================
// START
// ===============================

document.addEventListener("DOMContentLoaded", function(){
    renderProducts();
    loadStockFromSupabase();
    loadSoldCounts();
    loadProductOverrides();
    loadProductImages();
    updateUser();
    initCarousel();
    initPresenceTracking();
    loadAgentDiscountForList();
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.addEventListener("input", filterProducts);
    const sortSelect = document.getElementById("sortSelect");
    if(sortSelect) sortSelect.addEventListener("change", handleSortChange);
});
