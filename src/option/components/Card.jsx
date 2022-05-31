import React, { useState, useRef } from "react";
import Modal from "./Modal";
import Backdrop from "./Backdrop";
import Star from "../../icons/Star";
import Lock from "../../icons/Lock";


export default function Card({ section, sectionIndex, setArray,  config }) {
  
  const dragOver = useRef(null);

  const [isModalOpen, setModal] = useState(false);

  // Restore All Functionality
  const restoreAll = () => {
    if(config.restore === "alwaysCurrent"){

      section.Data.forEach((item) => {
        window.open(item.url);
      });
    }
    else{
      chrome.windows.create({ url: section.Data.map((item)=> item.url) , type: 
      "normal" });
    }
    
    if(config.allrestore==="dontKeepRestoreList"){
      setArray((prevState) =>
        prevState.filter((_, stateIndex) => stateIndex !== sectionIndex)
      );
    }
    else{
      // Don't delete the list
      setArray((prevState) => prevState);
    }
      
  };

  // Delete All Functionality
  const deleteAll = () => {
    setArray((prevState) =>
      prevState.filter((_, stateIndex) => stateIndex !== sectionIndex)
    );
  };

  // Handle close button
  const handleClose = (dataIndex, sectionIndex) => {
    setArray((prevState) => {
      if (prevState[sectionIndex].Data.length === 1) {
        prevState.splice(sectionIndex, 1);
      } else {
        prevState[sectionIndex].Data.splice(dataIndex, 1);
      }

      return [...prevState];
    });
  };

  const handleLink = (item) => {
    // console.log(item.url)
    window.open(item.url);
    if (!section.isLocked) {
      setArray((prevState) => {

        if (prevState[sectionIndex].Data.length === 1) {
          prevState.splice(sectionIndex, 1);
        } else {
          prevState[sectionIndex].Data.splice(item, 1);
        }

        return [...prevState];
      });
    }
  };

  const dragStarted = (e, index, sectionIndex) => {
    e.dataTransfer.setData("dataIndex", index);
    e.dataTransfer.setData("sectionIndex", sectionIndex);
  };

  const draggingOver = (e, index) => {
    e.preventDefault();
    dragOver.current = index;
  };

  const dragDropped = (e, endDataIndex, endSectionIndex) => {
    e.preventDefault();
    const startDataIndex = e.dataTransfer.getData("dataIndex");
    const startSectionIndex = e.dataTransfer.getData("sectionIndex");
    setArray((prevState) => {
      const obj = prevState[startSectionIndex].Data[startDataIndex];
      prevState[startSectionIndex].Data.splice(startDataIndex, 1);
      prevState[endSectionIndex].Data.splice(endDataIndex, 0, obj);
      if (prevState[startSectionIndex].Data.length === 0) {
        // console.log("array empty");
        prevState.splice(startSectionIndex, 1);
      }
      return [...prevState];
    });
  };


  // More Function
  const handleMore = () => {
    setModal(true); // Modal state set to true;
  };

  // close Modal box
  const closeModalHandler = () => {
    setModal(false); // Change modal state when clicked outside the box
  };

  //////////// Main Logic /////////////////////
  const changeHandler=(e)=>{
    setArray((prevState)=>{
      prevState[sectionIndex].name=e.target.value;
      return [...prevState];
     });
  }
  const blurHandler=(e)=>{
    setArray((prevState)=>{
      prevState[sectionIndex].isFormEnabled=false;
      return [...prevState];
     });
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    setArray((prevState)=>{
      prevState[sectionIndex].isFormEnabled=false;
      return [...prevState];
     });
  }
  return (
    <div className="cardContainer">
      <div className="cardDetails">
        
        {section.isFormEnabled ? <form onSubmit={submitHandler}>
          <input type="text" className="nameInputField" value={section.name} onChange={changeHandler} onBlur={blurHandler} autoFocus/>
          <input type="submit" style={{display:"none"}}></input>
        </form>: <h3 className="sectionName">{section.name}</h3>}
      
        {section.isLocked && <Lock />}
        {section.isStar && <Star />}

        <h3 className="cardTabs">{section.Data.length} <span data-locale="tabs"> tabs </span></h3>
        <div className="cardFunBox">
          <p> <span data-locale="created">created </span> {section.timeDate}</p>
          <ul >
            <li>
              <button data-locale="restore_all" onClick={restoreAll}>Restore All</button>
            </li>
            <li>
              {!section.isLocked && (
                <button data-locale="delete_all" onClick={deleteAll}>Delete All</button>
              )}
            </li>
            {/* <li>
              <button onClick={handleShare}>Share as web page</button>
            </li> */}
            <li className="posRel">
              <button data-locale="more" onClick={handleMore} className="moreButton">
                More...
              </button>
              {isModalOpen && (
              <Modal
                onButtonClick={closeModalHandler}
                section={section}
                setArray={setArray}
                sectionIndex={sectionIndex}
              />
            )}
            {isModalOpen && <Backdrop onCustomClick={closeModalHandler} />}
            </li>

            
          </ul>
        </div>
      </div>
      <div className="tabsList" id="myList">
        <ul>
          {section.Data.map((item, index) => (
            <li
              draggable
              onDragStart={(e) => dragStarted(e, index, sectionIndex)}
              onDragOver={(e) => draggingOver(e, index)}
              onDrop={(e) => dragDropped(e, index, sectionIndex)}
              key={`item-${section.section}-${index}`}
              data-index={index}
            >
              {!section.isLocked && (
                <a
                  className="closeTag"
                  onClick={() => handleClose(index, sectionIndex)}
                >
                  x
                </a>
              )}
              <img className={section.isLocked ? "iconImage":null} src={item.image} />
              <span onClick={() => handleLink(item)} title={item.url}>{item.title}</span>
              {/* <span onClick={() => handleLink(item)}>{item.title}</span> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
