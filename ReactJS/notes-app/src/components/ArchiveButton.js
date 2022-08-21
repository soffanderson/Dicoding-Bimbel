import React from "react";

function ArchiveButton({ id, archived, onArchive }) {
  return (
    <button className="btn btn-warning" onClick={() => onArchive(id)}>
      {archived === false ? "Arsipkan" : "Aktifkan"}
    </button>
  );
}

export default ArchiveButton;
