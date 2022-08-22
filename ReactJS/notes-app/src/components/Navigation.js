import React from "react";
import MyImage from "../images/note-svgrepo-com.svg";

function Navigation({ value, onChange }) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="/#">
          <img
            src={MyImage}
            alt=""
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          Notes App
        </a>

        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="/#buat">
              Buat Catatan
            </a>
            <a className="nav-link" href="/#aktif">
              Aktif
            </a>
            <a className="nav-link" href="/#arsip">
              Arsip
            </a>
          </div>
        </div>

        <form class="d-flex collapse" role="search">
          <input
            className="form-control mx-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={value}
            onChange={onChange}
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
