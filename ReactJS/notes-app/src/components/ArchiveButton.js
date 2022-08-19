import React from "react";

function ArchiveButton({ id, archived, onArchive }) {
  return (
    <button className="btn btn-warning" onClick={() => onArchive(id)}>
      {archived === false ? "Archive" : "Pindahkan"}
    </button>
  );
}

export default ArchiveButton;
