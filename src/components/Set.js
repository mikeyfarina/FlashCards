import React from "react";

const Set = ({ set }) => {
  console.log(set);
  return (
    <div className="sidebar__setlist__set">
      <h2 className="set__title">{set.title}</h2>
      <h3 className="set__length">
        {"Length of set: " + set.flashcards.length}
      </h3>
      <h4 className="set__preview">
        <ul>
          {set.flashcards.slice(0, 4).map((card) => (
            <li key={set.title}>{card.front}</li>
          ))}
        </ul>
      </h4>
    </div>
  );
};

export default Set;
