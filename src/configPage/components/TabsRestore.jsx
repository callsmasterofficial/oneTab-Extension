import React from 'react'

export default function tabsRestore({ config, setConfig }) {
  
  const handleChange = (e) =>{
      console.log("handler")
    setConfig(prevState=>({
        ...prevState,
        restore:e.target.value
    }))
      
  }
  
  return (
    <div className="container">
        <h3>When a tab group is restored, send the tabs to:</h3>
        <div className="tabsRestore options">
            <ul>
               
                <li>
                    {/* <input type="radio" id="alwaysNew" name="tabGroupRestored" defaultValue="alwaysNew" /> */}
                    <input 
                        type="radio" 
                        id="alwaysNew" 
                        name="tabGroupRestored" 
                        value="alwaysNew" 
                        onChange={handleChange}
                        checked= {config.restore === "alwaysNew"}
                    />
                    <label htmlFor="alwaysNew"><h4>Always a new window</h4></label>
                </li>
                <li>
                    {/* <input type="radio" id="alwaysCurrent" name="tabGroupRestored" defaultValue="alwaysCurrent" /> */}
                    <input 
                        type="radio" 
                        id="alwaysCurrent" 
                        name="tabGroupRestored" 
                        value="alwaysCurrent" 
                        onChange={handleChange}
                        checked= {config.restore === "alwaysCurrent"}
                    />
                    <label htmlFor="alwaysCurrent"><h4>Always the current window</h4></label>
                </li>    
            </ul>
        </div>
        
    </div>
  )
}
