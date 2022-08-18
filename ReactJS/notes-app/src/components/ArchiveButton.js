import React from "react";

function ArchiveButton({ id, onArchive }) {
  return (
    <button className="btn btn-secondary" onClick={() => onArchive(id)}>
      Archive
    </button>
  );
}

export default ArchiveButton;
