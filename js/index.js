const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "bd1e61a092666cbf6e759ed55012f539";

document.addEventListener("DOMContentLoaded", () => {
  renderNewMovies();
  renderListMovies('popular', 'now-playing__list');
  renderListMovies('top_rated', 'top-rated-playing__list');
});

const getMovies = (type) => {
  const URL = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-MX&page=1`;

  return fetch(URL)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error));
}

const renderNewMovies = async () => {
  const newMovies = await getMovies('now_playing');
  let html = "";
  newMovies.forEach((movie, index) => {
    const { id, title, overview, backdrop_path } = movie;
    const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
    const urlMovie = `../movie.html?id=${id}`;
    html += `
      <div class="carousel-item ${index === 0 ? 'active' : ''}" style="background-image: url('${urlImage}')">
        <div class="carousel-caption">
          <h5>${title}</h5>
          <p>${overview}</p>
          <a href="${urlMovie}" class="btn btn-primary">Más informacion</a>
        </div>
      </div>
    `;
  });

  html += `
    <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Anterior</span>
    </a>
    <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Siguiente</span>
    </a>
  `;

  document.getElementsByClassName("list-news-movies")[0].innerHTML = html;
}

const renderListMovies = async (type, classLoc) => {
  const listMovies = await getMovies(type);
  let html = "";
  listMovies.forEach((movie, index) => {
    const { id, title, poster_path } = movie;
    const movieCover = `https://image.tmdb.org/t/p/original${poster_path}`;
    const urlMovie = `../movie.html?id=${id}`;

    if (index < 5) {
      html += `
        <li class="list-group-item">
          <img src='${movieCover}' alt="${title}"/>
          <h3>${title}</h3>
          <a href='${urlMovie}' class='btn btn-primary'>Ver Más</a>
        </li>
      `;
    }
  });
  document.getElementsByClassName(classLoc)[0].innerHTML = html;
}
