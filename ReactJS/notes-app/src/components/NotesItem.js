import React from "react";
import NotesBody from "./NotesBody";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NotesItem({ title, body, createdAt, id }) {
  const divStyle = {
    width: "18rem",
  };

  return (
    <div className="card m-2 bg-dark text-white" style={divStyle}>
      <NotesBody title={title} body={body} createdAt={createdAt} />
    </div>
  );
}

export default NotesItem;
