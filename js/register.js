// ? =============> Global ===============>

const inputs = document.querySelectorAll("#register input"),
  form = document.querySelector("#register"),
  message = document.querySelector("#message"),
  html = document.documentElement,
  icon = document.getElementById("mode"),
  btnRegister = document.querySelector("#btnRegister");
let login = false;

// ! =============> When Start ===============>

icon.addEventListener("click", (e) => {
  const element = e.target;
  webColoring(element);
});

if (localStorage.getItem("theme") != null) {
  const themeMode = localStorage.getItem("theme");
  if (themeMode === "light") {
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    icon.classList.replace("fa-moon", "fa-sun");
  }
  html.setAttribute("data-theme", themeMode);
}
// * =============> Events ===============>

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (login === true) {
    getData();
  }
});

form.addEventListener("input", () => {
  if (
    nameValidation(0) &&
    nameValidation(1) &&
    emailValidation() &&
    passValidation() &&
    ageValidation()
  ) {
    login = true;
  } else {
    login = false;
  }
});

// ! =============> Functions ===============>

function webColoring(element) {
  if (element.classList.contains("fa-sun")) {
    html.setAttribute("data-theme", "light");
    element.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    element.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

function getData() {
  const userData = {
    first_name: inputs[0].value,
    last_name: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
    age: inputs[4].value,
  };
  registerForm(userData);
}

async function registerForm(data) {
  const api = await fetch(`https://sticky-note-fe.vercel.app/signup`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const response = await api.json();

  if (response.message === "success") {
    message.innerHTML = `<h4 class="text-success text-center fw-bold"> Success Registration</h4>`;
    btnRegister.classList.add("disabled", "type");
    setTimeout(() => {
      location.href = "./index.html";
    }, 1000);
  } else {
    message.innerHTML = `<h4 class="text-danger text-center fw-bold"> ${response.errors?.email.message}</h4>`;
  }
}

//  =============> Validation ===============>

function nameValidation(number) {
  const regex =
    /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/;
  if (regex.test(inputs[number].value)) {
    inputs[number].classList.add("is-valid");
    inputs[number].classList.remove("is-invalid");
    return true;
  } else {
    inputs[number].classList.add("is-invalid");
    inputs[number].classList.remove("is-valid");
    return false;
  }
}

function emailValidation() {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (regex.test(inputs[2].value)) {
    inputs[2].classList.add("is-valid");
    inputs[2].classList.remove("is-invalid");
    return true;
  } else {
    inputs[2].classList.add("is-invalid");
    inputs[2].classList.remove("is-valid");
    return false;
  }
}

function passValidation() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regex.test(inputs[3].value)) {
    inputs[3].classList.add("is-valid");
    inputs[3].classList.remove("is-invalid");
    return true;
  } else {
    inputs[3].classList.add("is-invalid");
    inputs[3].classList.remove("is-valid");
    return false;
  }
}

function ageValidation() {
  const regex = /^([1-7][0-9]|80)$/;
  if (regex.test(inputs[4].value)) {
    inputs[4].classList.add("is-valid");
    inputs[4].classList.remove("is-invalid");
    return true;
  } else {
    inputs[4].classList.add("is-invalid");
    inputs[4].classList.remove("is-valid");
    return false;
  }
}
