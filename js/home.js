// ? =============> Global ===============>

const loading = document.querySelector('.loading'),
html = document.documentElement,
icon = document.getElementById("mode"),
logoutBtn = document.getElementById('logout-btn');

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

getGames('mmorpg')

// * =============> Events ===============>

icon.addEventListener('click', (e) => { 
  const element = e.target
  webColoring(element)
  })

document.querySelectorAll('.menu a').forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelector('.menu .active').classList.remove('active')
    this.classList.add('active');
    const gamesType = this.dataset.category
    getGames(gamesType)
  })
})

logoutBtn.addEventListener('click',()=>{
  location.href = `../index.html`
  localStorage.removeItem("uToken")
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

async function getGames(categoryName) {
  loading.classList.remove('d-none')
  html.style.cssText =`overflow:hidden`
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bc99201aa8mshb61c92cbae95a3dp197cb0jsn698941022b52',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  const apiGames = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options)
  const api = await apiGames.json()
  displayGames(api)
  loading.classList.add('d-none')
  html.style.cssText = `overflow:auto`
}

function displayGames(data) {
  let gameBox =``;
  for (let i = 0; i < data.length; i++) {
    const videoPath =data[i].thumbnail.replace("thumbnail.jpg","videoplayback.webm");
    
    gameBox +=`
    <div class="col">
    <div onclick="showDetails(${data[i].id})"  onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" class="card h-100 bg-transparent" role="button" >
      <div class="card-body">
        <figure class="position-relative">
          <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
          <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
            <source src="${videoPath}">
          </video>
        </figure>
        <figcaption>
          <div class=" hstack justify-content-between">
            <h3 class="h6 small"> ${data[i].title}</h3>
            <span class="badge text-bg-primary p-2">Free</span>
      </div>
      <p class="card-text small text-center opacity-50">
        ${data[i].short_description}
      </p>
        </figcaption>
    </div>
    <footer class="card-footer small hstack justify-content-between">
          <span class="badge bg-danger">${data[i].genre}</span>
          <span class="badge bg-primary">${data[i].platform}</span>
    </footer>
    </div>
  </div>
    `;
  }
  document.getElementById('gameData').innerHTML = gameBox;
}

function startVideo(event) {
  const video = event.target.querySelector('video')
  video.classList.remove('d-none')
  video.muted=true
  video.play()
}

function stopVideo(event) {
  const video = event.target.querySelector('video')
  video.classList.add('d-none')
  video.muted=true
  video.pause()
}

function showDetails(id) {
  location.href = `../details.html?id=${id}`
}








