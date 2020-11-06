import React from "react";
import Set from "./Set";

const SetList = ({ flashcardSets }) => {
  return (
    <ul className="sidebar__setlist">
      {flashcardSets.map((set) => (
        <li key={Math.random(100) * 10}>
          <Set set={set} />
        </li>
      ))}
    </ul>
  );
};

export default SetList;
