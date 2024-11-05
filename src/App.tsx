import "./index.css";
import Taskbar from "./components/Taskbar";
import FileExplorer from "./components/FileExplorer";
import { file_explorer } from "./assets";
import { useEffect, useState } from "react";
import { F_F_Context_Wrapper } from "./contexts/FoldersAndFilesContext";

const App = () => {
  const [openExplorer, updateOpenExplorer] = useState(false);
  useEffect(() => {});

  return (
    <F_F_Context_Wrapper>
      <div className="h-full w-full flex flex-col justify-between relative overflow-hidden">
        <div
          className="flex flex-col w-fit pt-8 pl-4 items-center"
          onClick={() => updateOpenExplorer(true)}
        >
          <img src={file_explorer} alt="file explorer" height={40} width={40} />
          <span className="title font-semibold text-sm">file explorer</span>
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
