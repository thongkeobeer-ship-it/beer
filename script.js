let registerMode = false;

function openMenu(){
    document.getElementById("sidebar").classList.add("show");
}
function closeMenu(){
    document.getElementById("sidebar").classList.remove("show");
}

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
        setTimeout(()=>{
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

async function goProduct(name, price){
    const {data:{user}} = await supabaseClient.auth.getUser();
    if(!user){
        openLogin();
        return;
    }
    let url = "product.html?name=" + encodeURIComponent(name);
    if(price !== undefined) url += "&price=" + encodeURIComponent(price);
    location.href = url;
}

function filterProducts(){
    const q = document.getElementById("searchInput").value.trim().toLowerCase();
    document.querySelectorAll("#productGrid .card").forEach(function(card){
        const title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(q) ? "flex" : "none";
    });
}

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

document.addEventListener("DOMContentLoaded", function(){
    updateUser();
    initCategoryFilter();
    const searchInput = document.getElementById("searchInput");
    if(searchInput) searchInput.addEventListener("input", filterProducts);
});
