// import clubs from './clubs.js';

class DataSource {
  static searchAnime(keyword) {
    return fetch(
      `https://gogoanime.consumet.org/search?keyw=${keyword}`
    )
      .then((response) => {
        return response.json();
      })
      .then((animelist) => {
        if (animelist) {
          return Promise.resolve(animelist);
        } else {
          return Promise.reject(`${keyword} is not found`);
        }
      });
  }
}

export default DataSource;
