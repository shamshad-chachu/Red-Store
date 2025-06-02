const mainImg = document.querySelector(".img-container img")
let allImg = document.querySelectorAll(".small-imgs img")
// console.log(allImg);


allImg.forEach(Image => {
    Image.addEventListener("click",(e) =>{
        mainImg.src= e.target.src;
    })
})

const loginBtn = document.getElementById("login-btn")
const registerBtn = document.getElementById("register-btn")
const loginForm = document.getElementById("login")
const registerForm = document.getElementById("register")
const forgotBtn = document.getElementById("forgotBtn")
const userName = document.getElementById("login-username")
const password = document.getElementById("login-password")
const login = document.getElementById("login-user")
const container = document.querySelector(".all-items")
const userNameRegister = document.getElementById("register-username")
const passwordRegister = document.getElementById("register-password")
const register = document.getElementById("register-user")

const nav = document.querySelector(".nav-icon");
const hiddenNav = document.querySelector(".hidden-nav");
nav.addEventListener("click",()=>{
    if(hiddenNav.style.display == "block"){
        hiddenNav.style.display = "none"
    }else{
        hiddenNav.style.display = "block"
    }
})

loginBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    registerForm.style.transform = "translateX(0)"
    loginForm.style.transform = "translateX(0)"
})

registerBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    registerForm.style.transform = "translateX(-297px)"
    loginForm.style.transform = "translateX(-300px)"
    //used remove the erroe msg while shifting to the register form
    // if(container.children[2]){
    //     container.lastChild.remove()
    // }
    
})
let msg  = document.createElement("p")
msg.textContent= 'Username dosnt Exist!!'
msg.classList.add("error")
let newPassword 
//evnt to forgot btn
forgotBtn.addEventListener("click",(e)=>{
    forgotBtn.style.display = "none" // make the forgot btn disable
    login.innerText = "submit"
    password.placeholder = "Enter new password"
    let name = localStorage.getItem("username")

    //tracking the user is esist or not while typing password 
    password.addEventListener('input',(e)=>{
        if(userName.value != name){
        msg.id = "error-msg"
        msg.style.color = "red"
        let secondChild = loginForm.children[1]
        if(! document.getElementById("error-msg")){
            if(secondChild){
                loginForm.insertBefore(msg,secondChild)
            }
            else{
                loginForm.prepend(msg)
            }
        }else{
            console.log("alredy exist");
        }
    }
    else{
        newPassword = e.target.value
        
        
    }
    })
    // added evnt to login btn to make the new typrs password to save
    login.addEventListener("click",(e)=>{
        localStorage.setItem("password",newPassword)
        // let msg  = document.createElement("p")
        msg.innerHTML= 'Password reset successfull'
        msg.style.color = "green"
        // msg.classList.add("error")
        container.appendChild(msg)
        setTimeout(()=>{
            location.href = "index.html"
        },2000)
    })
    
})

//added evnt to register submit button
register.addEventListener("click",(e)=>{
    e.preventDefault();
    if(userNameRegister.value === "" || passwordRegister.value === ""){
        // const msg  = document.createElement("p")
        msg.innerHTML= 'Please enter the Username <br> and Password !!'
        // msg.classList.add("error")
        container.appendChild(msg)
        console.log(msg);
        setTimeout(()=>{
            container.removeChild(msg)
        },3000)
    }
    else{
        let name = userNameRegister.value
        let pass = passwordRegister.value
        localStorage.setItem("username",`${name}`)
        localStorage.setItem("password",`${pass}`)
        // localStorage.clear()
        loginPage();
    }
   
    userNameRegister.value = ""
    passwordRegister.value = ""
    
})
//funsction is created scces of register to move to login page
function loginPage(){
    registerForm.style.transform = "translateX(0)"
    loginForm.style.transform = "translateX(0)"
}
// added evnt to login submit button
let index = 0
login.addEventListener("click",(e)=>{
    e.preventDefault();
    if(userName.value === "" || password.value === ""){
        // let msg  = document.createElement("p")
        msg.innerHTML= 'Please enter the Username <br> and Password !!'
        // msg.classList.add("error")
        container.appendChild(msg)
        console.log(msg);
        setTimeout(()=>{
            container.removeChild(msg)
        },3000)
    }
    else{
        let name = localStorage.getItem("username")
        let pass = localStorage.getItem("password")
        //checking the username is macth or not
        if(userName.value !== name){
            index = ++index
            limt()
            // let notFound = document.createElement("p")
            msg.innerHTML= `Username dosn'nt exist . <br> please try again !!`
            // msg.classList.add("error")
            container.appendChild(msg)
            setTimeout(()=>{
                container.removeChild(msg)
            },3000)
            userName.value = ""
            password.value = ""
        }
        else if( password.value !== pass){
            index = ++index ;
            limt()
            // let notFound = document.createElement("p")
            msg.innerHTML= `Password dosn'nt match . <br> please try again !!`
            notFound.classList.add("error")
            container.appendChild(msg)
            setTimeout(()=>{
                container.removeChild(msg)
            },3000)
            password.value = ""
        }
        else{
            location.href = "index.html"
            userName.value = ""
            password.value = ""
        }
    }
})
// used to display error msg after try 7 times 
let time =0
function limt(){
    if(index === 1){
    userName.disabled = true;
    password.disabled = true;
    let notFound = document.createElement("p")
    notFound.innerHTML= `Reached your limit,Try <br> after some time!! ${time}`
    notFound.classList.add("error")
    container.appendChild(notFound)
    let start = setInterval(()=>{
        ++time
         notFound.innerHTML= `Reached your limit,Try <br> after some time!! ${time}`
         if(time == 30){
            clearInterval(start)
            userName.disabled = false;
            password.disabled= false;
            notFound.innerHTML= `Try Again!!`
            setTimeout(()=>{
                container.removeChild(notFound)
            },3000)
            userName.value =""
            password.value= ""
         }
    },1000)
    }
}

// document.getElementsByClassName("nav-icon").addEventListener("click",()=>{
//     document.getElementsByClassName("hidden-nav").style.display="block";
// })

console.log("hello");