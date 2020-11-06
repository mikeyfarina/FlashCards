import React, { useState } from "react";
import Form from "./Form";
const SidebarHeader = () => {
  const [sidebarSearchText, setSidebarSearchText] = useState("");

  return (
    <div className="sidebar__header">
      HEADER
      <Form
        className="search-bar"
        inputText={sidebarSearchText}
        setInputText={setSidebarSearchText}
      />
    </div>
  );
};

export default SidebarHeader;
