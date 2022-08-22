import React from "react";
import NotesList from "./NotesList";
import { getInitialData } from "./dataAll";
import NotesInput from "./NotesInput";
import Navigation from "./Navigation";
import "../App.css";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
      search: "",
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onNotesSearchHandeler = this.onNotesSearchHandeler.bind(this);
  }

  onNotesSearchHandeler(event) {
    this.setState(() => {
      return {
        search: event.target.value,
      };
    });
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          {
            id: "id-" + new Date().getTime(),
            title,
            body,
            createdAt: new Date(),
            archived: false,
          },
          ...prevState.notes,
        ],
      };
    });
  }

  onArchiveHandler(id) {
    const notes = this.state.notes.map((note) => {
      if (note.id === id) {
        if (note.archived === false) {
          return { ...note, archived: true };
        } else {
          return { ...note, archived: false };
        }
      }
      return note;
    });
    this.setState({ notes });
  }

  onDeleteHandler(id) {
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  render() {
    const search = this.state.notes.filter((note) =>
      note.title.toLowerCase().includes(this.state.search.toLowerCase())
    );
    return (
      <>
        <header className="mb-5 sticky-top">
          <Navigation
            value={this.state.search}
            onChange={this.onNotesSearchHandeler}
          />
        </header>
        <div className="container">
          <div className="text-light bg-dark shadow row p-3 mb-5 bg-body rounded d-flex mt-n0">
            <span class="anchor" id="buat"></span>
            <div className="col-md-6">
              <div className="col p-3">
                <h2 className="text-center">Tambah Catatan</h2>
              </div>
              <div className="col mb-3">
                <NotesInput addNote={this.onAddNoteHandler} />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <div className="col text-center">
                <h1 class="display-5">Cegah lupa ?</h1>
                <p class="lead">Catat, Simpan, Buka kapan saja dimana saja!</p>
              </div>
            </div>
          </div>

          <div className="row bg-light shadow p-3 mb-5 bg-body rounded d-flex justify-content-center mt-n0">
            <span class="anchor" id="aktif"></span>
            <div className="col">
              <div className="col p-3">
                <h1 className="text-center">Catatan Aktif</h1>
              </div>
              <div className="col mb-3">
                <NotesList
                  notes={search.filter((note) => note.archived === false)}
                  onArchive={this.onArchiveHandler}
                  onDelete={this.onDeleteHandler}
                />
              </div>
            </div>
          </div>

          <div className="row bg-light border-warning shadow p-3 mb-5 bg-body rounded d-flex justify-content-center mt-n0">
            <span class="anchor" id="arsip"></span>
            <div className="col">
              <div className="col p-3">
                <h1 className="text-center">Catatan Arsip</h1>
              </div>
              <div className="col mb-3">
                <NotesList
                  notes={search.filter((note) => note.archived !== false)}
                  onArchive={this.onArchiveHandler}
                  onDelete={this.onDeleteHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NotesApp;
