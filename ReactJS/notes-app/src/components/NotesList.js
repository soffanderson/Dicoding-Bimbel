import React from "react";
import NotesItem from "./NotesItem";

function NotesList({ notes }) {
  return (
    <div className="d-flex flex-wrap align-content-stretch justify-content-center">
      {notes.map((note) => (
        <NotesItem key={note.id} id={note.id} {...note} />
      ))}
    </div>
  );
}

export default NotesList;
