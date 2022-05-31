import React,{useState} from 'react'

export default function Startup({ config, setConfig}) {
//   const [startupOne, setStartUp]= useState("");
  const handleStartUp = (e) =>{
    //   setStartUp(e.target.value);
    //   console.log(e.target.value);
    setConfig(prevState=> ({ 
        ...prevState,
        startup: e.target.value
    }))
  }
  return (
    <div className="container">
        <h3 data-locale="startup">Startup:</h3>
        <div className="startup options">
            <ul>
                <li>
                    <input 
                        type="radio" 
                        id="displayOneTabAuto" 
                        name="startupTab" 
                        value="displayOneTabAuto"
                        onChange={handleStartUp}
                        checked= {config.startup ==="displayOneTabAuto"} 
                    />
                    <label htmlFor="displayOneTabAuto">
                        <h4 data-locale="start_onetab_automatically">Display OneTab whenever you start your web browser for the first time</h4>
                        {/* <p>You can still manually send a pinned tab to OneTab by right clicking within the web page to access the OneTab menu, and then clicking 'Send only this tab to OneTab'</p> */}
                    </label>
                </li>
                <li>
                    {/* <input 
                        type="radio" 
                        id="displayOneTabManually" 
                        name="startupTab" 
                        value="displayOneTabManually" 
                        onChange={handleStartUp}
                        checked={config.startup === "displayOneTabManually"}    
                    /> */}
                    {/* <label htmlFor="displayOneTabManually">
                        <h4>Do not open OneTab automatically</h4> */}
                        {/* <p>To open OneTab manually, use the right click menu and choose 'Display OneTab'</p> */}
                    {/* </label> */}
                </li>
                {/* <p>To open OneTab manually, use the right click menu and choose 'Display OneTab'</p> */}
            </ul>
            
        </div>
    </div>
  )
}
