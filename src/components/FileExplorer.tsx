import { useState } from 'react'
import '../index.css'
import DiskWindow from './DiskWindow'
import FolderWindow from './FolderWindow'
const FileExplorer = () => {
  const [switchWindow,updateSwitchWindow]=useState<boolean>(false)

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-4/6 h-[70vh] window scale-down  ">
      <div className="title-bar">
    <button aria-label="Close" className="close"></button>
    <h1 className="title">Explorer</h1>
    <button aria-label="Resize" className="resize"></button>
  </div>

      <div className="separator"></div>
        {switchWindow?<FolderWindow/>
        :
        <DiskWindow updateSwitchWindow={updateSwitchWindow}/>
        }
        
        </div>
    </div>
  )
}

export default FileExplorer
