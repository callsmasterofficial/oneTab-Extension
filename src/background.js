chrome.action.onClicked.addListener(()=>{
  chrome.tabs.create({
      url:chrome.runtime.getURL('option/index.html'), 
      "pinned":true
  },
  function(tab) { 
      tab.highlighted = true; 
      tab.active = true;
  })
});

// Automatic start-up
chrome.runtime.onStartup.addListener(()=> {
  chrome.app.window.create("option/index.html");
 });


// https://api.qrserver.com/v1/create-qr-code/?data=example.com

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    const action =request.action;
    if(action==="shareSection"){
      console.log(request.section)
    }
  }
);


chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
});