import React from "react";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NotesBody({ id, title, body, createdAt, onDelete, onArchive }) {
  return (
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p>
        <em>Created At {createdAt}</em>
      </p>
      <p className="card-text">{body}</p>
      <ArchiveButton id={id} onArchive={onArchive} />
      <DeleteButton id={id} onDelete={onDelete} />
    </div>
  );
}

export default NotesBody;
