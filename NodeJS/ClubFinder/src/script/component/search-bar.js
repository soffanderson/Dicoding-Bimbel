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
    this.innerHTML = `<div id="search-container" class="search-container">
      <input placeholder="Search football club" id="searchElement" type="search">
      <button id="searchButtonElement" type="submit">Search</button>
    </div>`;

    this.querySelector('#searchButtonElement').addEventListener(
      'click',
      this._clickEvent
    );
  }
}

customElements.define('search-bar', SearchBar);
