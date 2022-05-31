import React, { useEffect, useState } from "react";
import PinnedTabs from "./components/PinnedTabs";
import TabsRestore from "./components/TabsRestore";
import Startup from "./components/Startup";
import RestoreTab from "./components/RestoreTab";
import Duplicates from "./components/Duplicates";
import Back from "../icons/Back"
import localizeHtmlPage from "../functions/localizeHtmlPage";

function App() {
  const [config, setConfig] = useState({});
  useEffect(() => {
    chrome.storage.local.get("oneTabConfig", (result) => {
      if (result.oneTabConfig) {
        setConfig(JSON.parse(result.oneTabConfig));
      }
    });
    localizeHtmlPage();
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ oneTabConfig: JSON.stringify(config) });
  }, [config]);

  const handleBackToExtension = ()=>{
    chrome.tabs.query({},function(tabs){
      const optionTab=tabs.find((item)=>item.url===chrome.runtime.getURL('option/index.html'))
      const currentTab=tabs.find((item)=>item.active)
      if(optionTab){
        chrome.tabs.update(optionTab.id, {selected: true});
        chrome.tabs.remove(currentTab.id, function() { });
      }
    })
    // window.open(chrome.runtime.getURL("option/index.html"));
  }

  return (
    <div>
      <div className="optionHeader">
        <img
          className="logo"
          src={chrome.runtime.getURL("img/Onetab_logo_White.svg")}
          alt="OneTab logo"
        />
        <h1 data-locale="configurations">Configurations</h1>
        <div>
          <button  className="backBtn" onClick={handleBackToExtension}><Back /> <span data-locale="back_to_onetab">Back to OneTab</span></button>
        </div>
      </div>

      <hr className="style-four" />

      <TabsRestore config={config} setConfig={setConfig} />
      <PinnedTabs config={config} setConfig={setConfig} />
      <Startup config={config} setConfig={setConfig} />
      <RestoreTab config={config} setConfig={setConfig} />
      <Duplicates config={config} setConfig={setConfig} />
    </div>
  );
}

export default App;
