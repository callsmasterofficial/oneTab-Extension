window.addEventListener('load',function(e) {

    chrome.storage.local.get(['oneTabId'], function(result) {
        const userId=result.oneTabId
        const userIdInput=document.getElementById('userId').value;
        
        if(userId && userIdInput && userId===userIdInput){
            const shareId=document.getElementById('shareId').value;
            const button=document.createElement('button');
            button.className="font-base btn mt-4 bg-[#FF3200] p-2 text-white";
            button.innerText="Delete";
            // const btnHtml=`<button class="font-base btn mt-4 bg-[#FF3200] p-2 text-white">Delete</button>`
            button.onclick=function(e) {
                console.log("button clicked");
                chrome.runtime.sendMessage({action:"deleteShare",id:shareId})
            }
    
            document.getElementById('destroy').appendChild(button);
        }
        
    });
})

