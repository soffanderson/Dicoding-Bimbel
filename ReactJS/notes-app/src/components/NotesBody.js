import React from "react";
import ArchiveButton from "./ArchiveButton";
import DeleteButton from "./DeleteButton";

function NotesBody({ title, body, createdAt }) {
  return (
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p>
        <em>{createdAt}</em>
      </p>
      <p className="card-text">{body}</p>
    </div>
  );
}

export default NotesBody;
