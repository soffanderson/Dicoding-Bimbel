class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="max-w-5xl p-5 bg-slate-900 text-slate-200 mx-auto rounded-t-md ">
      <h1 class="text-2xl text-center font-bold">Anime Collections</h1>
    </div>`;
  }
}

customElements.define('app-bar', AppBar);
