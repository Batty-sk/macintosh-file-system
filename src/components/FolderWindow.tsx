import "../index.css";
import { del_icon, show_property } from "../assets";
import Folder from "./Folder";
import { useState, useEffect } from "react";
import AddrBar from "./AddrBar";
import { useUser } from "@clerk/clerk-react";
import { handleCreateGroup, handleDeleteGroup } from "../pinata";
import { useContext } from "react";
import { F_F_Context } from "../contexts/FoldersAndFilesContext";
import Diaglog_Box from "./Diaglog_Box";

type selectedNameIdProp = {
  Name_Id: string;
  isFolder: boolean;
};

type pathProp = {
  path: string;
  group_id: string;
};
const FolderWindow = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [path, updatePath] = useState<pathProp>({
    path: "/home",
    group_id: "",
  });
  const [popUp, updatePopup] = useState<boolean>(false);
  const [selectedNameId, updateSelectedNameId] = useState<selectedNameIdProp>({
    Name_Id: "",
    isFolder: false,
  });
  const { Folders, Files } = useContext(F_F_Context);
  const [tempFolders,setFolders] = useState(Folders)
  const [tempFiles,setFiles] = useState(Files)
  const [foldersCount, updateFoldersCount] = useState(0);

  const handleUploadFileToPinata = (file: File) => {};


  const handleSwitchPath = (folderName: string, id: string) => {
    //fetch the folders.
    //update the folderDepth
    //update the path
    const name = folderName.split("|")[1];
    updatePath({ path: path.path + "/" + name, group_id: id });
  };
  const handle_P_CreateGroup = async (folderName: string) => {
    if (user == undefined) return;
    try {
      const response = await handleCreateGroup({
        name: user?.id + "|" + folderName,
      });
      if (response) setFolders((prev) => [...prev, response]); // update the folders lisging
    } catch (e) {
      console.log("error happend while creating group", e);
    }
  };

  const handleCheckOn = (name: string, isFolder: boolean) => {
    console.log("id ", name);
    updateSelectedNameId({ Name_Id: name, isFolder });
  };

  const handleDelete = () => {
    console.log("selected Name Id", selectedNameId);
    if (selectedNameId.Name_Id) updatePopup(true);
  };

  const handleShowProp = () => {};

  const handleAccecptPopup = async () => {
    if (selectedNameId.isFolder) {
      const res = await handleDeleteGroup(selectedNameId.Name_Id);
      console.log("response we got", res);
      const updated_folders = tempFolders.filter(
        (item, index) => item.id != selectedNameId.Name_Id
      );
      setFolders(updated_folders);
      updatePopup(false);
    } else {
    }
  };

  const handleCancelPopup = () => {
    updatePopup(false);
  };

  const handleBackPath = () =>{
      updatePath({path:'/home',group_id:''})
  }

  useEffect(() => {
    if (path.path == '/home')
        {
          setFolders(Folders)
          setFiles(Files)
          return
        }
    if (!path.group_id) return;
    const Temp = tempFiles.filter((item, i) => item.group_id == path.group_id);
    setFiles((prev) => [...prev, ...Temp]);
    setFolders([])
  }, [path]);

  return (
    <div className="w-full h-full relative">
      {popUp && (
        <Diaglog_Box
          handleAccecptPopup={handleAccecptPopup}
          handleCancelPopup={handleCancelPopup}
        />
      )}
      <div className="p-4 flex  md:flex-row flex-col justify-between items-center">
        <div className="flex md:w-11/12 w-full md:justify-start justify-evenly">

          <div className="flex items-center btn md:p-3 p-2 w-32 ">
          <input
    id="file-upload"
    type="file"
    className="hidden"
  />
  <label
    htmlFor="file-upload"
    className="title text-sm cursor-pointer  "
  >Upload A File </label>   
         </div>
          <button
            className="md:ml-4 btn md:w-36 w-fit"
            onClick={() => {
              if(path.path=='/home')
                  updateFoldersCount(foldersCount + 1);
              return 0
            }}
            disabled={path.path!='/home'}
          >
            <span className="title md:text-sm text-[13px]">Create A Folder</span>
          </button>
        </div>

        <div className="flex w-full items-center md:justify-end md:me-5 mt-3">
          <img
            src={del_icon}
            alt="delete"
            onClick={handleDelete}
            className="cursor-pointer md:h-10 md:w-10 h-8 w-8"
          ></img>
          <img
            src={show_property}
            alt="properties"
            height={40}
            width={40}
            className="md:ml-5 ml-1 cursor-pointer md:h-10 md:w-10 h-8 w-8"
            onClick={handleShowProp}
          />
        </div>
      </div>
      <div className="address-bar">
        <AddrBar path={path.path} handleBackPath={handleBackPath} />
      </div>
      <div className="flex w-full h-full justify-between ">
        <div className="pt-5 p-8 min-w-80 w-auto md:h-3/5 h-4/5 folders overflow-auto overflow-x-hidden  mb-5">
          {tempFolders.map((item, index) => (
            <Folder
              key={item.id}
              id={item.id}
              newlyCreated={false}
              userId={user?.id}
              name={item.name}
              handleSwitchPath={handleSwitchPath}
              isChecked={
                selectedNameId.Name_Id == item.id && selectedNameId.isFolder
              }
              handleCheckOn={handleCheckOn}
              updateFoldersCount={updateFoldersCount}
              handle_P_CreateGroup={handle_P_CreateGroup}
            />
          ))}
          {new Array(foldersCount).fill(0).map((item, key) => (
            <Folder
              key={`key`}
              id={`${key}`}
              newlyCreated={true}
              userId={user?.id}
              name=""
              handleSwitchPath={handleSwitchPath}
              isChecked={false}
              handleCheckOn={handleCheckOn}
              updateFoldersCount={updateFoldersCount}
              handle_P_CreateGroup={handle_P_CreateGroup}
            />
          ))}
          {(!tempFiles.length && !tempFolders.length && !foldersCount)?<h1 className="title md:text-3xl text-2xl">No Files And Folder Found.</h1>:null}
        </div>
      </div>
    </div>
  );
};

export default FolderWindow;
