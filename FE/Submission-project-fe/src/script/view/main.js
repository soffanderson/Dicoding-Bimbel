import '../component/anime-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const animeListElement = document.querySelector('anime-list');
  const baseUrl = 'https://gogoanime.consumet.org/recent-release';

  const getAnime = () => {
    fetch(`${baseUrl}`)
      .then((response) => {
        return response.json();
      })
      .then((animelist) => {
        if (animelist.error) {
          showResponseMessage(animelist.message);
        } else {
          renderAllAnime(animelist);
        }
      })
      .catch((error) => {
        showResponseMessage(error);
      });
  };

  const renderAllAnime = (animes) => {
    animeListElement.innerHTML = '';

    animes.forEach((anime) => {
      animeListElement.innerHTML += `
      <div class="m-1 w-60 hover:opacity-100 opacity-75 bg-slate-800 border border-gray-800 rounded-lg">
        <a href="#">
            <img class="h-56 w-full object-cover object-center rounded-t-lg" src="${anime.animeImg}" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">${anime.animeTitle}</h5>
            </a>
            <p class="text-ellipsis overflow-auto max-h-44 font-normal text-gray-400">Episode: ${anime.episodeNum}</p>
            <p class="text-ellipsis overflow-auto max-h-44 mb-3 font-normal text-gray-400">Subtitle: ${anime.subOrDub}</p>
            <a href="${anime.animeUrl}"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Download
                <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
      `;
    });
  };

  const showResponseMessage = (
    message = 'Check your internet connection'
  ) => {
    alert(message);
  };

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchAnime(
        searchElement.value
      );
      renderResult(result);
    } catch (message) {
      fallbackResult(message);
    }
  };

  const renderResult = (results) => {
    animeListElement.animes = results;
  };

  const fallbackResult = (message) => {
    animeListElement.renderError(message);
  };

  searchElement.clickEvent = onButtonSearchClicked;
  getAnime();
};

export default main;
