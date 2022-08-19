import React from "react";
import NotesList from "./NotesList";
import { getInitialData } from "./dataAll";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
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
                <h1 className="text-center">Catatan Aktif</h1>
              </div>
              <div className="col mb-3">
                <NotesList
                  notes={this.state.notes}
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
