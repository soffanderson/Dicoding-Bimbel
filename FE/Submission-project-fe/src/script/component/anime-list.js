import './anime-item.js';

class AnimeList extends HTMLElement {
  set animes(animes) {
    this._animes = animes;
    this.render();
  }

  renderError(message) {
    this.innerHTML = '';
    this.innerHTML += `
    <h2 class="placeholder">${message}</h2>`;
  }

  render() {
    this.innerHTML = '';
    this._animes.forEach((anime) => {
      const animeItemElement = document.createElement('anime-item');
      animeItemElement.anime = anime;

      this.appendChild(animeItemElement);
    });
  }
}

customElements.define('anime-list', AnimeList);
