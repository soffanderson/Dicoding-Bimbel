class ClubItem extends HTMLElement {
  set club(club) {
    this._club = club;
    this.render();
  }
  render() {
    this.innerHTML = `
    
    
      <div class="bg-slate-900 text-slate-200 p-2 mb-5 rounded-b-xl border-t border-slate-700">
      <span>Hasil pencarian:</span>
      <div class="mt-4 max-w-xs bg-slate-800 border border-gray-800 rounded-lg">
    <a href="#">
        <img class="max-h-56 w-full object-cover object-center" src="${this._club.strTeamBadge}" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">${this._club.strTeam}</h5>
        </a>
        <p class="text-ellipsis overflow-auto max-h-44 mb-3 font-normal text-gray-400">${this._club.strDescriptionEN}</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
</div>
      
      
      
      </div>
  `;
  }
}

customElements.define('club-item', ClubItem);
