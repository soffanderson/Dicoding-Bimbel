import '../component/anime-list.js';
import '../component/search-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const animeListElement = document.querySelector('anime-list');
  const animePopularElement = document.querySelector('#dropdown-cta');
  const baseUrl = 'https://gogoanime.consumet.org';

  const getAnime = () => {
    fetch(`${baseUrl}/recent-release`)
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

  const getPopular = () => {
    fetch(`${baseUrl}/popular`)
      .then((response) => {
        return response.json();
      })
      .then((animelist) => {
        if (animelist.error) {
          showResponseMessage(animelist.message);
        } else {
          renderPopularAnime(animelist);
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
       <div class="m-1 w-40 hover:opacity-100 opacity-75 rounded-lg">
      <div class="relative">
        <a href="${anime.episodeUrl}">
          <img class="h-56 w-full object-cover object-center rounded-lg" src="${anime.animeImg}" alt="" />
        </a>
        <div class="absolute bottom-1 left-1 flex justify-between">
          <span class="bg-slate-100 text-slate-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded shadow-sm shadow-slate-500">Ep ${anime.episodeNum}</span>
          <span class="bg-yellow-400 text-yellow-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded shadow-sm shadow-slate-500">${anime.subOrDub}</span>
        </div>
      </div>
        
      <div class="p-1">
        <p class="text-wrap mb-2 tracking-tight text-white text-center">
          <a href="${anime.animeUrl}">${anime.animeTitle}</a>
        </p>
      </div>
    </div> 
      `;
    });
  };

  const renderPopularAnime = (animes) => {
    animePopularElement.innerHTML = '';
    animes.forEach((anime) => {
      animePopularElement.innerHTML += `
       <div class="hover:opacity-100 opacity-75 rounded-lg">
      <div class="grid grid-cols-2">
        <a href="${anime.animeUrl}">
          <img class="w-24 mb-3 object-cover object-center rounded-lg ml-3 mt-2" src="${anime.animeImg}" alt="" />
        </a>
          <p class="text-wrap -ml-3 mb-2 tracking-tight text-white font-bold">
            <a href="${anime.animeUrl}">${anime.animeTitle}</a>
                      <span class="bg-green-100 text-green-800 text-xs font-semibold mr-1 px-2.5 py-0.5 rounded shadow-sm shadow-green-500">Released: ${anime.releasedDate}</span>
          </p>
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
  getPopular();
};

export default main;
