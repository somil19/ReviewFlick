import React, { useState } from "react";

export default function ListBox({ element }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    //   Two boxes one for search movies list  and one for watched Movies summary
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}
