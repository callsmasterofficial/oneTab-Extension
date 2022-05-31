import React from "react";

export default function Header({ setArray, cardArray, config }) {
  const excludeUrl=["chrome://newtab/","chrome-extension://",'chrome://extensions/']
  const bringAllHandler = () => {
    // console.log(config);
    chrome.tabs.query({ currentWindow: true}, function (tabs) {
      const obj = {
        section: cardArray.length,
        name: "",
        isFormEnabled:false,
        isLocked: false,
        isStar: false,
        isDisable: false,
        timeDate: new Date().toLocaleString(),
        Data: [],
      };
      // console.log(config.pinned);
      
      let pinnedTabs=0;
      
      chrome.tabs.query({pinned: true},(index)=>{
        pinnedTabs=index.length > 0 ? index.length -1 : 0;
      });
      console.log(tabs);

      tabs.forEach((item) => {
        if(!excludeUrl.some(childUrl=>item.url.includes(childUrl))){  
          const urlObj={ url: item.url, image: item.favIconUrl, id: item.id, title: item.title };
          if((config.pinned==="dontAddPinned" && item.pinned) || (config.duplicate==="rejectDuplicates" && 
              obj.Data.findIndex((childUrlObj)=>childUrlObj.url===item.url)>-1)){
            return false;
          }
          obj.Data.push(urlObj);
        }
      });
      if (obj.Data.length > 0) {
        setArray([obj, ...cardArray]);
      }
      obj.Data.forEach((item) => {
        chrome.tabs.remove(item.id);
        // (should be Automatically handled..)
        // If we haven't pushed them into the list, don't delete them. 
      });
    });

  };

  const totalTabs = cardArray.reduce((acc, item)=> acc + item.Data.length,0);
  
  const feedbackHandler = () => {
    window.open("https://www.onetab.one/feedback");
  }

  const optionsPageHandler = ()=>{
    window.open(chrome.runtime.getURL("configPage/index.html"));
  }

  const aboutHandler = ()=>{
    // console.log("about page is called...");
    window.open("https://www.onetab.one");
  }

  const handleHelp = () => {
    window.open("https://www.onetab.one/help");
    // console.log("user asked for help...");
    // onButtonClick();
  }
  console.log({cardArray})
  return (
    <div className="HeaderDiv">
      <img
        className="logo"
        src={chrome.runtime.getURL("img/Onetab_logo_White.svg")}
        alt="OneTab logo"
      ></img>
      <div className="bringfunbox">
        <ul>
          <li>
            <button data-locale="merge_tab" className="bring_btn" onClick={bringAllHandler}></button>
          </li>
          <li>
            <button data-locale="configure" className="btn" onClick={optionsPageHandler}>Configure</button>
          </li>
          <li>
            <button data-locale="about" className="btn" onClick={aboutHandler}>About </button>
          </li>
          <li>
            <button data-locale="feedback" className="btn" onClick={feedbackHandler}>Feedback</button>
          </li>
          <li>
            <button data-locale="help" className="btn" onClick={handleHelp}>Help</button>
          </li>
        </ul>
      </div>
      <h3 className="activeTabs"><span className="totalTabs" data-locale="total_tabs">Total Tabs :</span> {totalTabs}</h3>

    </div>
  );
}
