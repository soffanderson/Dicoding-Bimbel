class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="max-w-5xl p-5 bg-slate-900 text-slate-200 mx-auto rounded-t-md shadow-slate-600 shadow-lg">
  <h1 class="text-2xl text-center font-bold">Anime Collections</h1>
`;
  }
}

customElements.define('app-bar', AppBar);
