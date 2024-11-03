import "./index.css"
import Taskbar from "./components/Taskbar"
import FileExplorer from "./components/FileExplorer"
import { file_explorer } from "./assets"
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";



const App = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(()=>{
    if(isLoaded)
    {
      console.log('userinformation:',user?.id)
    }
  },[isLoaded])


  return (
    <div className="h-full w-full flex flex-col justify-between relative">
      <div className="flex flex-col w-fit pt-8 pl-4 items-center">
        <img src={file_explorer} alt="file explorer" height={40} width={40} />
        <span className="title font-semibold text-sm">file explorer</span>
        </div>
      <div>
          <div className="flex justify-center h-full w-full">
     {/*      <FileExplorer/> */}

          </div>
        </div>
        <Taskbar />
    </div>
  )
}

export default App
