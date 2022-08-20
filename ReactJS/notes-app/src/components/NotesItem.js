import React from "react";
import ChangeBgArsip from "./NoteChangeBg";

function NotesItem({
  title,
  archived,
  body,
  createdAt,
  id,
  onDelete,
  onArchive,
}) {
  return (
    <ChangeBgArsip
      title={title}
      body={body}
      createdAt={createdAt}
      id={id}
      archived={archived}
      onArchive={onArchive}
      onDelete={onDelete}
    />
  );
}

export default NotesItem;
