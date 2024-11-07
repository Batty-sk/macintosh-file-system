import { useState, useEffect } from "react";

import { useUser } from "@clerk/clerk-react";
import {
  handleCreateFileInGroup,
  handleCreateGroup,
  handleDeleteGroup,
  handleDeleteFile,
} from "../pinata";
import AddrBar from "./AddrBar";

import File from "./File";
import { useContext } from "react";
import { F_F_Context } from "../contexts/FoldersAndFilesContext";
import Diaglog_Box from "./Diaglog_Box";
import { GroupResponseItem } from "pinata";
import "../index.css";
import { del_icon, show_property,loading } from "../assets";
import Folder from "./Folder";

type selectedNameIdProp = {
  Name_Id: string;
  isFolder: boolean;
};

type pathProp = {
  path: string;
  group_id: string;
};

type popUpProp = {
  open: boolean;
  title: string;
  handleCancelPopup: () => void;
  handleAccecptPopup: () => void;
};
const FolderWindow = () => {
  // we will be rendering the files on the basis of group id.
  const { isLoaded, isSignedIn, user } = useUser();
  const [path, updatePath] = useState<pathProp>({
    path: "/home",
    group_id: "",
  });
  const [popUp, updatePopup] = useState<popUpProp>({
    open: false,
    title: "",
    handleCancelPopup: () => {},
    handleAccecptPopup: () => {},
  });
  const [selectedNameId, updateSelectedNameId] = useState<selectedNameIdProp>({
    Name_Id: "",
    isFolder: false,
  });
  const { Folders, Files, setFolders, setFiles } = useContext(F_F_Context);
  const [foldersCount, updateFoldersCount] = useState(0);
  const [root, setRoot] = useState<GroupResponseItem | null>(null);
  const [loader,updateLoader] = useState<boolean>(false)

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
      updateLoader(true)
      const response = await handleCreateGroup({
        name: user?.id + "|" + folderName,
      });
      if (response) setFolders((prev) => [...prev, response]); // update the folders lisging
      updateLoader(false)
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
    if (selectedNameId.Name_Id)
      updatePopup({
        open: true,
        title: "You Sure Wanna Delete That? This Action Is Non-reversable",
        handleCancelPopup: handleCancelPopup,
        handleAccecptPopup: handleAccecptPopup,
      });
  };

  const handleShowProp = () => {};

  const handleAccecptPopup = async () => {
    if (selectedNameId.isFolder) {
      const res = await handleDeleteGroup(selectedNameId.Name_Id);
      console.log("response we got", res);
      const updated_folders = Folders.filter(
        (item) => item.id != selectedNameId.Name_Id
      );
      setFolders(updated_folders);
      updatePopup({
        open: false,
        title: "",
        handleCancelPopup: () => {},
        handleAccecptPopup: () => {},
      });
    } else {
      const res = await handleDeleteFile(path.group_id, selectedNameId.Name_Id);
      if (res) {
        const Temp = Files.filter((item) => item.id != selectedNameId.Name_Id);
        setFiles(Temp);
        updatePopup({
          open: false,
          title: "",
          handleCancelPopup: () => {},
          handleAccecptPopup: () => {},
        });
      } else {
        console.log("error while deleting the file");
      }
    }
  };

  const handleCancelPopup = () => {
    updatePopup({
      open: false,
      title: "",
      handleCancelPopup: () => {},
      handleAccecptPopup: () => {},
    });
  };

  const handleBackPath = () => {
    if (root) updatePath({ path: "/home", group_id: root.id });
    else {
      const folder = Folders.filter((item) => item.name == user?.id);
      updatePath({ path: "/home", group_id: folder[0].id });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    const file = event.target.files?.[0];

    if (file && file.size > MAX_FILE_SIZE) {
      updatePopup({
        open: true,
        title: "MAX_SIZE LIMIT EXCEED",
        handleCancelPopup: handleCancelPopup,
        handleAccecptPopup: handleCancelPopup,
      });
      return;
    }
    if (!user)
      // it means the user is undefined.
      return;
    const folder = Folders.filter((item) => item.name == user.id);
    console.log("folder", folder);
    if (!folder.length) return;

    if (file) {
      console.log("uploading...");
      updateLoader(true)
      try {
        const response = await handleCreateFileInGroup({
          file,
          group_name: path.path == "/home" ? folder[0].id : path.group_id,
        });
        if (response) setFiles((prev) => [...prev, response]);
        console.log("Upload response:", response);
        updateLoader(false)
      } catch (e) {
        updatePopup({
          title: "Error While Creating A File. Please Try Again",
          open: true,
          handleAccecptPopup: handleCancelPopup,
          handleCancelPopup: handleCancelPopup,
        });
      }
    }
  };

  useEffect(() => {
    const folder = Folders.filter((item) => item.name == user?.id)[0];
    console.log("folder", folder);
    setRoot(folder);
    if (folder) updatePath({ path: "/home", group_id: folder?.id });
    console.log("setting root", root);
  }, [user?.id]);

  return (
    <div className="w-full h-full relative">
      {popUp.open && (
        <Diaglog_Box
          title={popUp.title}
          handleAccecptPopup={popUp.handleAccecptPopup}
          handleCancelPopup={popUp.handleCancelPopup}
        />
      )}
      <div className="p-4 flex  md:flex-row flex-col justify-between items-center">
        <div className="flex md:w-11/12 w-full md:justify-start justify-evenly">
          <div className="flex items-center btn md:p-3 p-2 w-32 ">
            {loader?<img src={loading} alt="" className="animate-spin" />:
        <>   <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="title text-sm cursor-pointer  "
            >
              Upload A File
            </label>
            </> 
}
          </div>
          <button
            className="md:ml-4 btn md:w-36 w-fit"
            onClick={() => {
              if (path.path == "/home") updateFoldersCount(foldersCount + 1);
              return 0;
            }}
            disabled={path.path != "/home"}
          >
            <span className="title md:text-sm text-[13px]">
              {loader?<img src={loading} alt="" className="animate-spin" />:
             <>Create A Folder</> }
            </span>
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
          {path.path == "/home" &&
            Folders.map((item) => {
              if (item.name == user?.id) {
                return null;
              }
              return (
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
              );
            })}
          {new Array(foldersCount).fill(0).map((_, key) => (
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

          {Files.map((item) => {
            console.log("pathgroupid", path.group_id);
            if (item.group_id == path.group_id)
              return (
                <File
                  key={item.id}
                  handleCheckOn={handleCheckOn}
                  id={item.id}
                  fileName={item.name}
                  mimeType={item.mime_type}
                  isChecked={
                    selectedNameId.Name_Id == item.id &&
                    !selectedNameId.isFolder
                  }
                  cid={item.cid}
                />
              );
            else null;
          })}
          {!Files.length && Folders.length == 1 && !foldersCount ? (
            <h1 className="title md:text-3xl text-2xl">
              No Files And Folder Found.
            </h1>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FolderWindow;
