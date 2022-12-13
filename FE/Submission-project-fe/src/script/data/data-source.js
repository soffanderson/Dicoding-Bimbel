// Import clubs from './clubs.js';

class DataSource {
	static searchAnime(keyword) {
		return fetch(
			`https://gogoanime.consumet.org/search?keyw=${keyword}`,
		)
			.then(response => response.json())
			.then(animelist => {
				if (animelist) {
					return Promise.resolve(animelist);
				}

				return Promise.reject(`${keyword} is not found`);
			});
	}
}

export default DataSource;
