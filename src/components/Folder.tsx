import React, { useState } from "react";
import { folder, close, correct } from "../assets";
import { handleCreateGroup } from "../pinata";

type Props = {
  newlyCreated: boolean;
  name: string;
  userId: string | undefined;
  handleSwitchPath: (groupId: string) => void;
  isChecked: boolean;
  handleCheckOn: (name:string,isFolder:boolean) => void;
  updateFoldersCount:React.Dispatch<React.SetStateAction<number>>,
};
const Folder = ({
  newlyCreated,
  name,
  userId,
  handleSwitchPath,
  isChecked,
  handleCheckOn,
  updateFoldersCount
}: Props) => {
  const [isNewlyCreated, updateIsNewlyCreated] = useState(!newlyCreated);
  const [folderName, updateFolderName] = useState("");
  const [radioOn, updateRadioOn] = useState<boolean>(isChecked);

  const handleDoneEditing = async () => {
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
    if(!folderName){
        updateFoldersCount(0)
      return 

    }
    updateFolderName("");
  };

  const handleChangeEvent = () => {
    if (radioOn) {
      updateRadioOn(false);
      return;
    }
    handleCheckOn(name,true)
  };

  return (
    <div
      className="flex items-center "
      onClick={() => handleSwitchPath(userId + "|" + name)}
    >
      <div className="field-row">
        <input
          id="radio1"
          type="radio"
          name="first-example"
          checked={radioOn}
          onChange={() => handleChangeEvent()}
        />
        <label htmlFor="radio1"></label>
      </div>{" "}
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
