class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  // untuk setting event click button
  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  //   mendapatkan nilai value pada form untuk digunakan di main.js
  get value() {
    return this.querySelector('#searchElement').value;
  }

  render() {
    this.innerHTML = `
      <div id="search-container" class="border-t grid grid-cols-2 border-slate-700 p-3 mx-auto max-w-5xl bg-slate-900">
        <div class="flex items-center mx-auto">
          <div class=" mt-0 mr-6 space-x-8 text-md font-bold text-slate-200">
                  <ul class="flex flex-col mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 font-bold">
        <li>
          <a href="/" class="block py-2 pl-3 pr-4" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#recent" class="block py-2 pl-3 pr-4">Recent</a>
        </li>
        <li>
          <a href="#populer" class="block py-2 pl-3 pr-4 ">Populer</a>
        </li>
      </ul>
          </div>
      </div>
  
      <div class="flex">
        <input
        class="max-w-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search anime" id="searchElement" type="search">
        <button
        class="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        id="searchButtonElement" type="submit">Search</button>
      </div>  
      </div>
    `;

    this.querySelector('#searchButtonElement').addEventListener(
      'click',
      this._clickEvent
    );
  }
}

customElements.define('search-bar', SearchBar);
