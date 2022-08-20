import React from "react";
import NotesBody from "./NotesBody";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";
import { showFormattedDate } from "./dataAll";

function changeBgArsip({
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
  const isArchived = archived;
  if (isArchived) {
    return (
      <div className="card bg-light text-dark m-2" style={divStyle}>
        <NotesBody
          title={title}
          body={body}
          createdAt={showFormattedDate(createdAt)}
        />
        <div className="card-footer">
          <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
          <DeleteButton id={id} onDelete={onDelete} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="card bg-dark text-light m-2" style={divStyle}>
        <NotesBody
          title={title}
          body={body}
          createdAt={showFormattedDate(createdAt)}
        />
        <div className="card-footer">
          <ArchiveButton id={id} archived={archived} onArchive={onArchive} />
          <DeleteButton id={id} onDelete={onDelete} />
        </div>
      </div>
    );
  }
}

export default changeBgArsip;
