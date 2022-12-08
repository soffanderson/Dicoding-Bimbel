class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="navbar bg-neutral text-neutral-content">
  <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
</div>`;
  }
}

customElements.define('app-bar', AppBar);
