import React from "react";
import NotesList from "./NotesList";
import { getInitialData } from "./dataAll";
import NotesInput from "./NotesInput";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    this.setState((prevState) => {
      return {
        notes: [
          {
            id: "id-" + new Date().getTime(),
            title,
            body,
            createdAt: new Date().toISOString(),
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
    return (
      <div className="container">
        <div className="col">
          <div className="row d-flex justify-content-center p-3">
            <h1>Notes App by Soffan</h1>
          </div>

          <div className="row bg-light shadow p-3 mb-5 bg-body rounded d-flex justify-content-center mt-n0">
            <div className="col">
              <div className="col p-3">
                <h1 className="text-center">Tambah Catatan</h1>
              </div>
              <div className="col mb-3">
                <NotesInput addNote={this.onAddNoteHandler} />
              </div>
            </div>
          </div>

          <div className="row bg-light shadow p-3 mb-5 bg-body rounded d-flex justify-content-center mt-n0">
            <div className="col">
              <div className="col p-3">
                <h1 className="text-center">Catatan Aktif</h1>
              </div>
              <div className="col mb-3">
                <NotesList
                  notes={this.state.notes.filter(
                    (note) => note.archived === false
                  )}
                  onArchive={this.onArchiveHandler}
                  onDelete={this.onDeleteHandler}
                />
              </div>
            </div>
          </div>

          <div className="row bg-light shadow p-3 mb-5 bg-body rounded d-flex justify-content-center mt-n0">
            <div className="col">
              <div className="col p-3">
                <h1 className="text-center">Catatan Archived</h1>
              </div>
              <div className="col mb-3">
                <NotesList
                  notes={this.state.notes.filter(
                    (note) => note.archived !== false
                  )}
                  onArchive={this.onArchiveHandler}
                  onDelete={this.onDeleteHandler}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotesApp;
