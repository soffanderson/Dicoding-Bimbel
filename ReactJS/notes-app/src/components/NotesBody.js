import React from "react";

function NotesBody({ title, body, createdAt }) {
  const divStyle = {
    height: "12rem",
    overflow: "hidden",
  };
  return (
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p>
        <em>{createdAt}</em>
      </p>
      <p className="card-text" style={divStyle}>
        {body}
      </p>
    </div>
  );
}

export default NotesBody;
