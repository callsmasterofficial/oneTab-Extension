import { apiCall, uid } from "./bg/function";

chrome.action.onClicked.addListener(() => {
  const optionUrl=chrome.runtime.getURL("option/index.html");
  chrome.tabs.query({}, function(tabs) {
    const optionTab=tabs.find((item)=>item.url.includes(optionUrl));
    if(optionTab){
      chrome.tabs.update(optionTab.id, {selected: true});
    }else{
      chrome.tabs.create(
        {
          url: optionUrl,
          pinned: true,
        },
        function (tab) {
          tab.highlighted = true;
          tab.active = true;
        }
      );
    }
  })
  
});

// Automatic start-up
chrome.runtime.onStartup.addListener(() => {
  chrome.app.window.create("option/index.html");
});

// on install handler
chrome.runtime.onInstalled.addListener(function (details) {
  chrome.storage.local.get(["oneTabId"], function (result) {
    if (!result.oneTabId) {
      chrome.storage.local.set({ oneTabId: uid() });
    }
  });
});

// https://api.qrserver.com/v1/create-qr-code/?data=example.com

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const action = request.action;
  console.log(sender);
  if (action === "shareSection") {
    chrome.storage.local.get(["oneTabId"], function (result) {
      apiCall("https://www.onetab.one/api/addsection", {
        ...request.section,
        userId: result.oneTabId,
        extId: chrome.runtime.id,
      })
        .then((result) => {
          chrome.tabs.create({
            url: "https://www.onetab.one/share/" + result.id,
          });
          console.log({ result });
        })
        .catch((error) => {
          console.log({ error });
        });
    });
    console.log(request.section);
  } else if (action === "deleteShare") {
    apiCall(
      "https://www.onetab.one/api/addsection",
      { id: request.id, extId: chrome.runtime.id },
      "DELETE"
    )
      .then((result) => {
        chrome.tabs.reload(sender.id);
        console.log({ result });
      })
      .catch((err) => {
        console.log({ err });
      });
  }
});

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
});
