// ? =============> Global ===============>

const searchParam = location.search,
  html = document.documentElement,
  loading = document.querySelector(".loading"),
  icon = document.getElementById("mode"),
  param = new URLSearchParams(searchParam),
  id = param.get("id");

// ! =============> When Start ===============>

if (localStorage.getItem("theme") != null) {
  const themeMode = localStorage.getItem("theme");
  if (themeMode === "light") {
    icon.classList.replace("fa-sun", "fa-moon");
  } else {
    icon.classList.replace("fa-moon", "fa-sun");
  }
  html.setAttribute("data-theme", themeMode);
}

getData(id);

// ? =============> Event ===============>

icon.addEventListener("click", (e) => {
  const element = e.target;
  webColoring(element);
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

async function getData(id) {
  loading.classList.remove("d-none");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "bc99201aa8mshb61c92cbae95a3dp197cb0jsn698941022b52",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const api = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  const response = await api.json();
  display(response);
  loading.classList.add("d-none");
}

function display(data) {
  const background = data.thumbnail.replace(" thumbnail", " background");
  let game = `
  <div class="col-md-4">
    <figure>
        <img src="${data.thumbnail}" class="w-100" alt="details image" />
        <a href="${data.game_url}" class="btn btn-primary fw-bold  w-100 mt-2">Play Now  <i class="fa-solid fa-gamepad"></i></a>
    </figure>
  </div>
  <div class="text-center text-sm-start col-md-8 ">
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
          <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
        </ol>
      </nav>
        <h1>${data.title}</h1>
        <h3>About ${data.title}</h3>
        <p>${data.description}</p>
        <h3 class=" text-capitalize h3 text-warning ">minimum system requirements :-</h3>
        <p><span class="h5 fw-bold">Graphics : </span>${data.minimum_system_requirements.graphics}</p>
        <p><span class="h5 fw-bold">Memory : </span>${data.minimum_system_requirements.memory}</p>
        <p><span class="h5 fw-bold">Os : </span>${data.minimum_system_requirements.os}</p>
        <p><span class="h5 fw-bold">Processor : </span>${data.minimum_system_requirements.processor}</p>
        <img class="w-100" src="${data.screenshots[0].image}">
    </div>
  </div>
  `;
  document.getElementById("detailsData").innerHTML = game;
  document.body.style.cssText = `background:url(${background}) center / cover no-repeat`;
}


param.addEventListener("submit", function(e){

})