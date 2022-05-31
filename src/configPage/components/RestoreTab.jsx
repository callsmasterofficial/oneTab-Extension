import React,{useState} from 'react'

export default function RestoreTab({ config, setConfig}) {
//   const [restoreAllFun, setRestoreFun] = useState("");
  const handleRestoreChange = (e) =>{
    //   setRestoreFun(e.target.value);
    //   console.log(e.target.value);
    setConfig(prevState=> ({
        ...prevState,
        allrestore: e.target.value
    }))
  }
  return (
    <div className="container">
        <h3 data-locale="restore_all_title">On clicking 'restore all' or restoring a single tab:</h3>
        <div className="restoreTabs options">
            <ul>
                <li>
                    <input 
                        type="radio" 
                        id="dontKeepRestoreList" 
                        name="restoreTab" 
                        value="dontKeepRestoreList" 
                        onChange={handleRestoreChange}
                        checked={config.allrestore === "dontKeepRestoreList"}
                        
                    />
                    <label htmlFor="dontKeepRestoreList">
                        <h4 data-locale="dont_keep_restore_list">Open the tabs and remove them from your OneTab list</h4>
                        {/* <p>You still can press ctrl, cmd or shift to restore the tab(s) without removing them from OneTab. If you set any of your tab groups as 'locked' then the tabs will not be removed from OneTab unless you unlock that tab group first.</p> */}
                    </label>
                </li>
                <p data-locale="dont_keep_restore_list_note">You still can press ctrl, cmd or shift to restore the tab(s) without removing them from OneTab. If you set any of your tab groups as 'locked' then the tabs will not be removed from OneTab unless you unlock that tab group first.</p>
                <li>
                    <input 
                        type="radio" 
                        id="keepRestoreList" 
                        name="restoreTab" 
                        value="keepRestoreList" 
                        onChange={handleRestoreChange}
                        checked= {config.allrestore === "keepRestoreList"}
                    />
                    <label htmlFor="keepRestoreList">
                        <h4 data-locale="keep_restore_list">Keep them in your OneTab list</h4>
                        {/* <p>You can manually delete entries by hovering over them and clicking the X icon, or by clicking the 'delete all' button</p> */}
                    </label>
                </li>
                <p data-locale="keep_restore_list_note">You can manually delete entries by hovering over them and clicking the X icon, or by clicking the 'delete all' button</p>
            </ul>
        </div>
    </div>
  )
}
