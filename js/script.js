//dark mode

const btn = document.querySelector(".btn-toggle");
const sunMoon = document.querySelector('.fa-sharp')
sunMoon.classList.add('fa-moon')

btn.addEventListener("click", () =>{
    switchTheme()
 sunMoon.classList.add('fa-sun')
 if (sunMoon.classList.contains('fa-sun')) {
      sunMoon.classList.toggle('fa-moon')
    }

});
function switchTheme(){
   
    console.log('hkhb');
    const rootEl = document.documentElement
    let dataTheme = rootEl.getAttribute('data-theme'),
    newTheme
   
    newTheme = (dataTheme === 'light') ? 'dark' : 'light'
    rootEl.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
     
    
  }

//header  effect
const nav = document.querySelector('.nav')

window.addEventListener('scroll', fixNav)

function fixNav() {
    if(window.scrollY > nav.offsetHeight + 150){
           nav.classList.add('active')
    }
    else{
        nav.classList.remove('active')
    }
}

//
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=32202d41dc188c72ceaac167736c66f0&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=32202d41dc188c72ceaac167736c66f0&query="';
const form = document.getElementById('form')
const searchTerm = document.getElementById('search')
const main = document.getElementById('main')

 getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data =await res.json()
    console.log(data);
    showMovies(data.results)
}
function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview } = movie

        const moviEl = document.createElement('div')
        moviEl.classList.add('movie')
        moviEl.innerHTML =`
            <img src="${IMG_PATH + poster_path}" alt="">
            <div class="movie-info">
                <h3>
                    ${title}
                </h3>
                <span >${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
        </div>
        `
       main.appendChild(moviEl)
    });
}


form.addEventListener('submit', (e) => {

    e.preventDefault()

    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm )
        search.value = ''
    }
    else {
        window.location.reload()
    }
})

