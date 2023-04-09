// ? =============> Global ===============>
const inputs = document.querySelectorAll('#login input'),
form = document.querySelector('#login'),
message = document.querySelector('#message'),
html = document.documentElement,
icon = document.getElementById("mode"),
btnLogin = document.querySelector('#btnLogin');
let login = false ;

// ! =============> When Start ===============>

if(localStorage.getItem("theme") != null){
  const themeMode = localStorage.getItem("theme")
  if(themeMode === "light"){
    icon.classList.replace('fa-sun','fa-moon')
  }else{
    icon.classList.replace('fa-moon','fa-sun')
  }
  html.setAttribute("data-theme",themeMode)
}

// * =============> Events ===============>

icon.addEventListener('click', (e) => { 
  const element = e.target
  webColoring(element)
  })

form.addEventListener("submit", (e) =>{
e.preventDefault();
if (login === true){
  getData()
}
})

form.addEventListener('input', () => {
  if ( emailValidation() && passValidation()){
    login = true
  }else{
    login = false;
  }
})

// ! =============> Functions ===============>

function webColoring(element) {
  if(element.classList.contains("fa-sun")){
    html.setAttribute("data-theme","light")
    element.classList.replace('fa-sun','fa-moon')
    localStorage.setItem("theme","light")
  }else{
    html.setAttribute("data-theme","dark")
    element.classList.replace('fa-moon','fa-sun')
    localStorage.setItem("theme","dark")
  }
}

function getData() {
  const userData = {
    "email":inputs[0].value,
    "password":inputs[1].value,
  }
  loginForm(userData)
}

async function loginForm(data) {
  const api= await fetch(`https://sticky-note-fe.vercel.app/signin` , {
  method:"post",
  body:JSON.stringify(data),
  headers:{
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  })
const response = await api.json()


if (response.message === "success"){
  localStorage.setItem("uToken",response.token)
  message.innerHTML = `<h4 class="text-success text-center fw-bold"> Success Registration</h4>`
  btnLogin.classList.add('disabled','type')
  location.href = './home.html'
}else{
  message.innerHTML = `<h4 class="text-danger text-center fw-bold"> ${response.message}</h4>`
}
}

//  =============> Validation ===============>

function emailValidation() {
  const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if (regex.test(inputs[0].value)){
    inputs[0].classList.add("is-valid")
    inputs[0].classList.remove("is-invalid")
    return true
  }else{
    inputs[0].classList.add("is-invalid")
    inputs[0].classList.remove("is-valid")
    return false
  }
}

function passValidation() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (regex.test(inputs[1].value)){
    inputs[1].classList.add("is-valid")
    inputs[1].classList.remove("is-invalid")
    return true
  }else{
    inputs[1].classList.add("is-invalid")
    inputs[1].classList.remove("is-valid")
    return false
  }
}

