import "./index.css"
import Taskbar from "./components/Taskbar"
import FileExplorer from "./components/FileExplorer"
import { file_explorer } from "./assets"
import { useEffect, useState } from "react";



const App = () => {

  const [openExplorer,updateOpenExplorer] = useState(false)

  return (
    <div className="h-full w-full flex flex-col justify-between relative">
      <div className="flex flex-col w-fit pt-8 pl-4 items-center" onClick={()=>updateOpenExplorer(true)}>
        <img src={file_explorer} alt="file explorer" height={40} width={40} />
        <span className="title font-semibold text-sm">file explorer</span>
        </div>
      <div>
          <div className="flex justify-center h-full w-full">
           
            {openExplorer && <FileExplorer/>}
          </div>
        </div>
        <Taskbar />
    </div>
  )
}

export default App
