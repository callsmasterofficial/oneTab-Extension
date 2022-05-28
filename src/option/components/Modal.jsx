import React,{useState} from 'react';
import PopupShare from './PopupShare';
import Backdrop from "./Backdrop";

export default function Modal(props) {
  const [isPopupOpen, setPopUp]= useState(true);

  const toggleSharePage = () => {
    setPopUp(!isPopupOpen);
    // console.log(isPopupOpen);
  }
const {sectionIndex, setArray,onButtonClick}=props;
  // Name this tab   
  const handleName = () => {
      // console.log("name is pressed..");
      setArray((prevState)=>{
        prevState[sectionIndex].isFormEnabled=true;
        return [...prevState];
       });
      onButtonClick();
  }

  // Star this tab   
  const handleStar = () => {
    setArray((prevState)=>{
     prevState[sectionIndex].isStar=!prevState[sectionIndex].isStar;
     return [...prevState];
    });
    onButtonClick();
  }
  

//   Lock this tab   
  const handleLock = () => {
    setArray((prevState)=>{
      prevState[sectionIndex].isLocked=!prevState[sectionIndex].isLocked;
      return [...prevState];
     });
     onButtonClick();
  }

// Share as web Page
  const handleShare = () => {
    chrome.runtime.sendMessage({action:"shareSection",section:props.section})
    onButtonClick();
  }


  return (
    <div className="moreFunctionalBox" id="box">
      <button onClick={handleShare}>Share this section</button>
        <button onClick={handleName}>Name this tab</button>
        <button onClick={handleStar}>{props.section.isStar? "Un-star this tab": "Star this tab"}</button>
        <button onClick={handleLock}>{props.section.isLocked ? "Un-lock this tab": "Lock this tab"}</button>
        
        {/* <button onClick={handleHelp}>Help</button> */}
    </div>
  )
}