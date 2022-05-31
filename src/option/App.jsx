import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import localizeHtmlPage from "../functions/localizeHtmlPage";

function App() {
  // const [cardArray, setArray] = useState(JSON.parse(localStorage.getItem("data")) || []);
  const [config, setConfig] = useState({});
  const [cardArray, setArray] = useState([]);
  console.log(config);
  useEffect(() => {
    chrome.storage.local.get(["data"], function (result) {
      // console.log("here we go! " + result.data);
      if (result.data) {
        setArray(result.data);
      }
    });
    chrome.storage.local.get(["oneTabConfig"], function (result) {
      // console.log("here we go! " + result.data);
      if (result.oneTabConfig) {
        setConfig(JSON.parse(result.oneTabConfig));
      }
    });
    localizeHtmlPage();
  }, []);

  useEffect(() => {
    // localStorage.setItem("data", JSON.stringify(cardArray));
    chrome.storage.local.set({ data: cardArray }, function () {
      // console.log("Storage is set in chrome storage... " + JSON.stringify(cardArray));
    });
    localizeHtmlPage();
  }, [cardArray]);
  
  function cardChange(item, index) {
    return (
      <Card
        key={`section-${index}`}
        section={item}
        sectionIndex={index}
        setArray={setArray}
        config={config}
      />
    );
  }

  return (
    <div className="App">
      <Header setArray={setArray} cardArray={cardArray} config = {config}/>
      
      {cardArray.length > 0 ? (
        cardArray.map(cardChange)
      ) : (
        <h1 data-locale="no_tabs_found"> No tabs found.</h1>
      )}
    </div>
  );
}

export default App;
