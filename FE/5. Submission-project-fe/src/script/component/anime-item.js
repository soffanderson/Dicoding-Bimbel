class AnimeItem extends HTMLElement {
	set anime(anime) {
		this._anime = anime;
		this.render();
	}

	render() {
		this.innerHTML = `
      <div class="m-1 w-full sm:w-48 md:w-40 hover:opacity-100 opacity-75 rounded-lg">
          <div class="relative">
              <a href="${this._anime.animeUrl}">
                  <img class="h-56 w-full object-cover object-center rounded-lg" src="${this._anime.animeImg}" alt="" />
              </a>
              <div class="absolute bottom-1 left-1 flex justify-between">
                  <span
                      class="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">${this._anime.status}</span>
              </div>
          </div>

          <div class="p-1">
              <p class="text-wrap mb-2 tracking-tight text-white text-center">
                  <a href="${this._anime.animeUrl}">${this._anime.animeTitle}</a>
              </p>
          </div>
      </div>
    `;
	}
}

customElements.define('anime-item', AnimeItem);
