import { ReactEventHandler, useState } from "react";
import "../index.css";
import DiskWindow from "./DiskWindow";
import FolderWindow from "./FolderWindow";

type Prop = {
  updateOpenExplorer: React.Dispatch<React.SetStateAction<boolean>>;
};
const FileExplorer = ({ updateOpenExplorer }: Prop) => {
  const [switchWindow, updateSwitchWindow] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    
  };

  // Handle mouse move to update position while dragging
  const handleMouseMove = (e: any) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleClose = () => {
    updateOpenExplorer(false);
  };

  return (
    <div
      className="w-full h-full flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="w-4/6 h-[70vh] window scale-down  ">
        <div
          className="title-bar"
          onMouseDown={handleMouseDown}
          style={{ cursor: "move" }}
        >
          <button
            aria-label="Close"
            className="close"
            onClick={handleClose}
          ></button>
          <h1 className="title">Explorer</h1>
          <button
            aria-label="Close"
            className="close"
            onClick={handleClose}
          ></button>
        </div>

        <div className="separator"></div>
        {switchWindow ? (
          <FolderWindow />
        ) : (
          <DiskWindow updateSwitchWindow={updateSwitchWindow} />
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
