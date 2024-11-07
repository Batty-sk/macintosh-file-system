import { ReactEventHandler, useState,useEffect} from "react";
import "../index.css";
import DiskWindow from "./DiskWindow";

import FolderWindow from "./FolderWindow";
import { user as userImg } from "../assets";
import { useUser } from "@clerk/clerk-react";
import { SignOutButton } from "@clerk/clerk-react";
import { useRef } from "react";
type Prop = {
  updateOpenExplorer: React.Dispatch<React.SetStateAction<boolean>>;
};
const FileExplorer = ({ updateOpenExplorer }: Prop) => {
  const [switchWindow, updateSwitchWindow] = useState<boolean>(false);
  const [position, setPosition] = useState({ x: 0, y: 40 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { isLoaded, isSignedIn, user } = useUser();
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle mouse or touch down to start dragging
  const handleDragStart = (e: any) => {
    setDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
  };

  // Handle mouse or touch move to update position while dragging
  const handleDragMove = (e: any) => {
    if (dragging) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      setPosition({
        x: clientX - offset.x,
        y: clientY - offset.y,
      });
    }
  };

  // Handle mouse or touch end to stop dragging
  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleClose = () => {
    updateOpenExplorer(false);
  };

  return (
    <div
      className="w-full h-full flex flex-col"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove} // Mobile drag move
      onTouchEnd={handleDragEnd} // Mobile drag end
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="md:w-4/6 w-5/6 md:h-[70vh] h-[68vh] window scale-down relative">
        <div
          className="title-bar"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart} // Mobile drag start
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

        <div ref={profileRef} className="absolute bottom-1 right-2 flex flex-col items-center justify-center w-fit p-2 cursor-pointer" onClick={()=>setShowLogout(!showLogout)}>
          {showLogout && <div className="border p-2 md:text-sm text-[10px]"> <SignOutButton/>? </div>}
          <div className="flex items-center">
            <img src={userImg} alt="" className="md:h-10 md:w-10 w-9 h-9" />
            <h2 className="ms-1 md:text-sm md:block hidden text-[13px]">{user?.username}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
