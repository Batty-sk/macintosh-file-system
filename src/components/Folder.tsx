import React, { useState } from "react";
import { folder, close, correct } from "../assets";
import { handleCreateGroup } from "../pinata";

type Props = {
  newlyCreated: boolean;
  name: string;
  userId: string | undefined;
  handleSwitchPath:(groupId:string)=>void;
};
const Folder = ({ newlyCreated, name, userId,handleSwitchPath }: Props) => {
  const [isNewlyCreated, updateIsNewlyCreated] = useState(!newlyCreated);
  const [folderName, updateFolderName] = useState("");

  const handleDoneEditing = async () => {
    //we call the pinaata api.
    if (userId == undefined) {
      console.log("userId is undefined please first sign IN");
      return 0;
    }
    const res = await handleCreateGroup({ name: userId + "|" + folderName });
    console.log("response", res);
    updateIsNewlyCreated(true);
  };
  console.log("name", name);
  const handleReset = () => {
    updateFolderName("");
  };
  return (
    <div className="flex items-center " onClick={()=>handleSwitchPath(userId+'|'+name)}>
      <img src={folder} alt="folder" height={48} width={48} />
      {!isNewlyCreated ? (
        <>
          <input
            type="text"
            value={!newlyCreated ? name : folderName}
            onChange={
              !newlyCreated
                ? () => {}
                : (e) => {
                    updateFolderName(e.target.value);
                  }
            }
          />
          <div className="flex">
            <img
              src={correct}
              height={20}
              width={20}
              alt=""
              onClick={() => {
                handleDoneEditing();
              }}
              className="cursor-pointer"
            />
            <img
              src={close}
              height={20}
              width={20}
              alt=""
              className="ml-2 cursor-pointer"
              onClick={() => {
                handleReset();
              }}
            />
          </div>
        </>
      ) : (
        <span className="pl-2">{name ? name : folderName}</span>
      )}
    </div>
  );
};

export default Folder;
