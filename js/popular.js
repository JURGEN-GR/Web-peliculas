const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "bd1e61a092666cbf6e759ed55012f539";

document.addEventListener('DOMContentLoaded', () => {
  let { page } = getUrlVars();
  page == undefined ? page = 1 : null;
  renderPopularMovies(page);
  renderControls(page);
});

const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
}

const getPopularMovies = (page) => {
  const url = `${URL_PATH}/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=${page}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => result.results)
    .catch(error => console.log(error));
}

const renderPopularMovies = async (page) => {
  const movies = await getPopularMovies(page);
  let html = '';
  movies.forEach(movie => {
    const { id, title, poster_path } = movie;
    const urlImage = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const urlMoreInfo = `../movie.html?id=${id}`;
    html += `
      <div class='col-3 col-custom'>
        <a href='${urlMoreInfo}' class='card custom-card'>
          <img src='${urlImage}' class='card-img-top' alt='${title}'/>
          <div class='card-body'>
            <h4 class='card-title text-center m-0'>${title}</h4>
          </div>
        </a>
      </div>
    `;
  });

  document.getElementsByClassName('list-cards')[0].innerHTML = html;
}

const renderControls = (page) => {
  const baseUrlPage = "../popular.html?page="
  const pageNumber = parseInt(page);
  const previus = pageNumber - 1;
  const next = pageNumber + 1;
  let html = "";

  if (page == 1) {
    html = `
      <ul class='pagination justify-content-center'>
        <li class='page-item disabled'>
          <a class='page-link' href='#'>
            <i class='fas fa-chevron-left'></i>
          </a>
        </li>
        <li class='page-item active'>
          <a class='page-link' href='${baseUrlPage + '1'}'>1</a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + '2'}'>2</a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + '3'}'>3</a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + '2'}'>
            <i class='fas fa-chevron-right'></i>
          </a>
        </li>
      </ul>
    `;
  } else {
    html = `
      <ul class='pagination justify-content-center'>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + previus}'>
            <i class='fas fa-chevron-left'></i>
          </a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + previus}'>${pageNumber - 1}</a>
        </li>
        <li class='page-item active'>
          <a class='page-link' href='${baseUrlPage + pageNumber}'>${pageNumber}</a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + next}'>${pageNumber + 1}</a>
        </li>
        <li class='page-item'>
          <a class='page-link' href='${baseUrlPage + next}'>
            <i class='fas fa-chevron-right'></i>
          </a>
        </li>
      </ul>
    `;
  }

  document.getElementsByClassName('navigation')[0].innerHTML = html;
}