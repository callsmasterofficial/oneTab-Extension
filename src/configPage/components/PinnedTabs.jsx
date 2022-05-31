import React,{useState} from 'react'

export default function PinnedTabs({config, setConfig}) {

  const handlePinChange = (e)=>{
    setConfig(prevState => ({
        ...prevState,
        pinned: e.target.value
    }))
  }
  return (
    <div className="container">
        <h3 data-locale="pinned">Pinned tabs:</h3>
        <div className="pinnedTabs options">
            <ul>
                <li>
                    <input 
                        type="radio" 
                        id="dontAddPinned" 
                        name="pinTab" 
                        value="dontAddPinned"
                        onChange={handlePinChange} 
                        checked ={config.pinned === "dontAddPinned"} 
                    />
                    <label htmlFor="dontAddPinned">
                        <h4 data-locale="dont_add_pinned">Don't send pinned tabs to OneTab</h4>
                    </label>
                </li>
                {/* <p>You can still manually send a pinned tab to OneTab by right clicking within the web page to access the OneTab menu, and then clicking 'Send only this tab to OneTab'</p> */}
                <li>
                    <input 
                        type="radio" 
                        id="addPinned" 
                        name="pinTab" 
                        value="addPinned"
                        onChange={handlePinChange}
                        checked= {config.pinned === "addPinned"}
                    />
                    <label htmlFor="addPinned">
                        <h4 data-locale="add_pinned">Allow pinned tabs to be sent to OneTab</h4>
                    </label>
                </li>
                
            </ul>
            {/* <p>
                Note: A tab becomes 'pinned' when you right click on the tab and click 'Pin tab'. Some people like to make sites such as Facebook or Gmail pinned so they can easily locate them. OneTab will remember whether a tab was pinned when you restore it.
            </p> */}
        </div>
    </div>
  )
}
