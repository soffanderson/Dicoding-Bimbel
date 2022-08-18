import React from "react";
import NotesList from "./NotesList";
import { getInitialData } from "./dataAll";

class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getInitialData(),
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Notes App by Soffan</h1>
        <h2>Daftar Catatan</h2>
        <NotesList notes={this.state.notes} />
      </div>
    );
  }
}

export default NotesApp;
