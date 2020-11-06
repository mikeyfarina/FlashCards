import React from "react";
import SidebarHeader from "./SidebarHeader";
import SetList from "./SetList";

const Sidebar = ({ flashcardSets, setFlashcardSets }) => {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <SetList flashcardSets={flashcardSets} />
    </div>
  );
};

export default Sidebar;
