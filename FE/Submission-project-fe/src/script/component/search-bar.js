class SearchBar extends HTMLElement {
	connectedCallback() {
		this.render();
	}

	set clickEvent(event) {
		this._clickEvent = event;
		this.render();
	}

	get value() {
		return this.querySelector('#searchElement').value;
	}

	render() {
		this.innerHTML = `
		<!-- Navbar goes here -->
		<nav  id="search-container" class="bg-slate-900 shadow-lg border-t border-slate-700">
			<div class="max-w-6xl mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-7">
						<!-- Primary Navbar items -->
						<div class="hidden md:flex items-center space-x-1">
							<a href="/" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-b-4 border-green-500 transition duration-300 hover:border-b-3 ">Home</a>
							<a href="#recent" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-b-4 border-green-500 transition duration-300">Recent</a>
							<a href="#populer" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 hover:border-b-4 border-green-500 transition duration-300">Populer</a>
						</div>
					</div>
					<!-- Secondary Navbar items -->
					<div class="hidden md:flex items-center space-x-3 ">
        <input
            class="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search anime" id="searchElement" type="search">
        <button
            class="w-20 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            id="searchButtonElement" type="submit">Search</button>
					</div>
					<!-- Mobile menu button -->
					<div class="md:hidden flex items-center m-3 flex-row">
            <button class="outline-none mobile-menu-button">
              <svg class=" w-6 h-6 text-gray-500 hover:text-blue-700 "
							x-show="!showMenu"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
              >
							<path d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					</button>
          <div class="text-slate-200 font-bold ml-2">Menu</div>
					</div>
				</div>
			</div>
			<!-- mobile menu -->
			<div class="hidden mobile-menu">
				<ul class="text-slate-200 font-bold">
					<li><a href="/" class="block text-sm px-2 py-4 text-white bg-blue-700 font-semibold">Home</a></li>
					<li><a href="#recent" class="block text-sm px-2 py-4 hover:bg-blue-700 transition duration-300">Recent</a></li>
					<li><a href="#populer" class="block text-sm px-2 py-4 hover:bg-blue-700 transition duration-300">Populer</a></li>
				</ul>
        <div class="m-1 flex">
          <input
              class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search anime" id="searchElement" type="search">
          <button
              class="w-20 ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              id="searchButtonElement" type="submit">Search</button>
        </div>
			</div>
		</nav>
    
<!-- <nav id="search-container" class="flex items-center justify-between flex-wrap bg-slate-900 border-t border-slate-700 p-2">
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="ml-5 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="font-bold text-sm lg:flex-grow">
      <a href="/" class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-400 text-white mr-4">
        Home
      </a>
      <a href="#recent" class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-400 text-white mr-4">
        Recent
      </a>
      <a href="#populer" class="block mt-4 lg:inline-block lg:mt-0 hover:text-teal-400 text-white">
        Populer
      </a>
    </div>

    <div class="flex p-2 md:p-1">
        <input
            class="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search anime" id="searchElement" type="search">
        <button
            class="w-20 ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            id="searchButtonElement" type="submit">Search</button>
    </div>
  </div>
</nav> -->
      <!-- </div> -->
    `;

				const btn = document.querySelector("button.mobile-menu-button");
				const menu = document.querySelector(".mobile-menu");

				btn.addEventListener("click", () => {
					menu.classList.toggle("hidden");
				});

		this.querySelector('#searchButtonElement').addEventListener(
			'click',
			this._clickEvent,
		);
	}
}

customElements.define('search-bar', SearchBar);
