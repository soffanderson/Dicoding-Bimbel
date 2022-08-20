import React from "react";
import NotesBody from "./NotesBody";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NotesItem({
  title,
  archived,
  body,
  createdAt,
  id,
  onDelete,
  onArchive,
}) {
  const divStyle = {
    width: "20rem",
  };

  return (
    <div className="card m-2 bg-dark text-white" style={divStyle}>
      <NotesBody title={title} body={body} createdAt={createdAt} />
      <div className="card-footer">
        <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </div>
  );
}

export default NotesItem;
