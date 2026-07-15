let registerMode = false;

// ===== SIDEBAR MENU =====
function openMenu(){
    document.getElementById("sidebar").classList.add("show");
}
function closeMenu(){
    document.getElementById("sidebar").classList.remove("show");
}

// ===== LOGIN BOX =====
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
    document.getElementById("authTitle").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂາສູ່ລະບົບ";
    document.getElementById("authButton").innerText = registerMode ? "ສະຫມັກສະມາຊິກ" : "ເຂົ້າສູ່ລະບົບ";
    document.getElementById("authToggle").innerText = registerMode ? "ເຂົ້າສູ່ລະບົບ" : "ສະຫມັກສະມາຊິກ";
    document.getElementById("authMsg").innerText = "";
}

// ===== REGISTER + LOGIN =====
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
    msg.innerText = "ກຳລັງດເນີນການ...";

    if(registerMode){
        const {data, error} = await supabaseClient.auth.signUp({ email, password });

        if(error){
            msg.style.color = "#ff5a5a";
            msg.innerText = error.message;
            return;
        }

        msg.style.color = "#7dff6a";
        msg.innerText = "ສະຫມກສຳເລັດ! ກະລຸນາເຂົາສູ່ລະບບ";
        setTimeout(()=>{
            registerMode = false;
            document.getElementById("authTitle").innerText = "ເຂົ້າສູ່ລະບົບ";
            document.getElementById("authButton").innerText = "ເຂົ້າສູ່ລະບົບ";
            document.getElementById("authToggle").innerText = "ສະຫມັກສະມາຊິກ";
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
        msg.innerText = "ເຂົາສູ່ລະບບສຳເລັດ";
        await updateUser();
        setTimeout(closeLogin, 700);
    }
}

// ===== GOOGLE LOGIN =====
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

// ===== ACCOUNT BUTTON =====
async function handleAccountClick(){
    const {data:{user}} = await supabaseClient.auth.getUser();

    if(user){
        if(confirm(`ເຂົ້າສູ່ລະບົບດ້ວຍ: ${user.email}\n\nຕ້ອງການອອກຈາກລະບົບບໍ?`)){
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
        btn.title = "ເຂົ້າສູ່ລະບົ
