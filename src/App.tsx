import "./index.css";
import Taskbar from "./components/Taskbar";
import FileExplorer from "./components/FileExplorer";
import { file_explorer,skull } from "./assets";
import { useEffect, useState } from "react";
import { F_F_Context_Wrapper } from "./contexts/FoldersAndFilesContext";

const App = () => {
  const [openExplorer, updateOpenExplorer] = useState(false);
  useEffect(() => {});

  return (  
    <F_F_Context_Wrapper>
      <div className="h-full w-full flex flex-col justify-between relative overflow-hidden">
        <div className="absolute md:-right-96 -right-64 flex h-[92%] items-center -z-10">
          <img src={skull} alt="" style={{objectFit:'cover'}}   className="md:w-[800px] w-[500px]" />
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
  <h1 className="title md:text-3xl text-lg font-bold md:me-0 me-14 ">
    "The skull's cold stare challenges you to rise above the rest."
  </h1>

</div>
        <div
          className="flex flex-col w-fit pt-8 pl-4 items-center "
          onClick={() => updateOpenExplorer(true)}
        >
          <img src={file_explorer} alt="file explorer" height={40} width={40} className="cursor-pointer" />
          <h1 className="title md:text-sm text-[12px] ">file explorer</h1>
        </div>
          {openExplorer && (
            <FileExplorer updateOpenExplorer={updateOpenExplorer} />
          )}
        <Taskbar />
      </div>
    </F_F_Context_Wrapper>
  );
};

export default App;
