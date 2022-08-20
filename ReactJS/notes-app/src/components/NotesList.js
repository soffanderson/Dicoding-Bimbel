import React from "react";
import NotesItem from "./NotesItem";

function NotesList({ notes, onArchive, onDelete }) {
  return notes.length > 0 ? (
    <div className="d-flex flex-wrap align-content-stretch ">
      {notes.map((note) => (
        <NotesItem
          key={note.id}
          id={note.id}
          onDelete={onDelete}
          onArchive={onArchive}
          {...note}
        />
      ))}
    </div>
  ) : (
    <p className="text-center">Tidak ada catatan</p>
  );
}

export default NotesList;
