import React, { useState } from "react";
import { folder, close, correct } from "../assets";

type Props = {
  newlyCreated: boolean;
  name: string;
  userId: string | undefined;
  handleSwitchPath: (folderName: string,id:string) => void;
  isChecked: boolean;
  handleCheckOn: (name:string,isFolder:boolean) => void;
  updateFoldersCount:React.Dispatch<React.SetStateAction<number>>,
  handle_P_CreateGroup:(folderName:string) =>void
  id:string
};
const Folder = ({
  newlyCreated,
  name,
  userId,
  handleSwitchPath,
  isChecked,
  handleCheckOn,
  updateFoldersCount,
  handle_P_CreateGroup,
  id,
}: Props) => {
  const [isNewlyCreated, updateIsNewlyCreated] = useState(!newlyCreated);
  const [folderName, updateFolderName] = useState("");

  const handleDoneEditing = async () => {
      handle_P_CreateGroup(folderName);
      updateFoldersCount(0)
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
    console.log('changing ....')
    if (isChecked) {
      return ;
    }
    handleCheckOn(id,true)
  };

  return (
    <div
      className="flex items-center "
    >
      <div className="field-row">
        <input
          id={id}
          type="radio"
          name="first-example"
          checked={isChecked}
          onChange={() => handleChangeEvent()}
        />
        <label htmlFor={id}></label>
      </div>{" "}
      <img src={folder} alt="folder" className="md:h-12 md:w-12 h-10 w-10" />
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
              alt="ok"
              onClick={() => {
                handleDoneEditing();
              }}
              className="cursor-pointer md:h-[20px] md:w-[20px] w-4 h-4"
            />
            <img
              src={close}
              alt="cancel"
              className="ml-2 cursor-pointer md:h-[20px] md:w-[20px] w-4 h-4"
              onClick={() => {
                handleReset();
              }}
            />
          </div>
        </>
      ) : (
        <span className="pl-2 cursor-pointer" onClick={() => handleSwitchPath(name,id)}>{name ? name : folderName}</span>
      )}
    </div>
  );
};

export default Folder;
