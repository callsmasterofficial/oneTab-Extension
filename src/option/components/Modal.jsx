import React, { useEffect } from "react";
import localizeHtmlPage from "../../functions/localizeHtmlPage";

export default function Modal(props) {
  
  useEffect(() => {
    localizeHtmlPage();
  },[])
  
  const { sectionIndex, setArray, onButtonClick } = props;
  // Name this tab
  const handleName = () => {
    // console.log("name is pressed..");
    setArray((prevState) => {
      prevState[sectionIndex].isFormEnabled = true;
      return [...prevState];
    });
    onButtonClick();
  };

  // Star this tab
  const handleStar = () => {
    setArray((prevState) => {
      prevState[sectionIndex].isStar = !prevState[sectionIndex].isStar;
      return [...prevState];
    });
    onButtonClick();
  };

  //   Lock this tab
  const handleLock = () => {
    setArray((prevState) => {
      prevState[sectionIndex].isLocked = !prevState[sectionIndex].isLocked;
      return [...prevState];
    });
    onButtonClick();
  };

  // Share as web Page
  const handleShare = () => {
    chrome.runtime.sendMessage({
      action: "shareSection",
      section: props.section,
    });
    onButtonClick();
  };

  return (
    <div className="moreFunctionalBox" id="box">
      <button data-locale="share_this_tab" onClick={handleShare}>
        Share this section
      </button>
      <button data-locale="name_this_tab" onClick={handleName}>
        Name this tab
      </button>
      <button onClick={handleStar}>
        {props.section.isStar ? (
          <span data-locale="unstar_this_tab"></span>
        ) : (
          <span data-locale="star_this_tab"></span>
        )}
      </button>
      <button onClick={handleLock}>
        {props.section.isLocked ? "Un-lock this tab" : "Lock this tab"}
      </button>

      {/* <button onClick={handleHelp}>Help</button> */}
    </div>
  );
}
