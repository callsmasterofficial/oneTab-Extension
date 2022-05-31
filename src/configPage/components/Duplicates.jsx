import React,{useState} from 'react'

export default function Duplicates({ config, setConfig}) {
//   const [duplicate, setDuplicate] = useState("");
  const handleDuplicate = (e) =>{
    //   setDuplicate(e.target.value);
    //   console.log(e.target.value);
    setConfig(prevState=> ({
        ...prevState,
        duplicate: e.target.value
    }))
  }
  return (
    <div className="container">
        <h3 data-locale="duplicates_title">Duplicates:</h3>
        <div className="pinnedTabs options">
            <ul>
                <li>
                    <input 
                        type="radio" 
                        id="allowDuplicates" 
                        name="duplicates" 
                        value="allowDuplicates" 
                        onChange={handleDuplicate} 
                        checked= {config.duplicate === "allowDuplicates"}
                    />
                    <label htmlFor="allowDuplicates">
                        <h4 data-locale="allow_duplicates"> Allow duplicates</h4>
                        {/* <p>You can still manually send a pinned tab to OneTab by right clicking within the web page to access the OneTab menu, and then clicking 'Send only this tab to OneTab'</p> */}
                    </label>
                </li>
                <li>
                    <input 
                        type="radio" 
                        id="rejectDuplicates" 
                        name="duplicates" 
                        value="rejectDuplicates" 
                        onChange={handleDuplicate}
                        checked= {config.duplicate === "rejectDuplicates"}    
                    />
                    <label htmlFor="rejectDuplicates">
                        <h4 data-locale="reject_duplicates">Silently reject duplicates</h4>
                        {/* <p>If OneTab already contains the URL of a tab, it will not be added again. This only applies when you click the OneTab icon or use the right click menu to send multiple tabs to OneTab. If you use the right click OneTab menu to send only a specific tab to OneTab, then the duplicate will be allowed for that specific tab.</p> */}
                    </label>
                </li>
                <p data-locale="reject_duplicates_note">If OneTab already contains the URL of a tab, it will not be added again. This only applies when you click the OneTab icon 
                    {/* or use the right click menu to send multiple tabs to OneTab. If you use the right click OneTab menu to send only a specific tab to OneTab, then the duplicate will be allowed for that specific tab.*/}
                </p> 
            </ul>
        </div>
    </div>
  )
}
