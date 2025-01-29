import { useState } from "react";
// import "./accordion.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button className="accordion-header font-roboto-condensed" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="content-inner">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
