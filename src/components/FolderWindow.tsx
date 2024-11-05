import "../index.css";
import { del_icon,show_property } from "../assets";
import Folder from "./Folder";
import { useState,useEffect } from "react";
import AddrBar from "./AddrBar";
import { useUser } from "@clerk/clerk-react";


type selectedNameIdProp={
  Name_Id:string,
  isFolder:boolean
}

const FolderWindow = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [path, updatePath] = useState("/home");
  const [selectedNameId,updateSelectedNameId] = useState<selectedNameIdProp>({Name_Id:'',isFolder:false})

  const [folderDepth, updateFolderDepth] = useState(1);


  const handleUploadFileToPinata = (file: File) => {};

  const [foldersCount, updateFoldersCount] = useState(0);

  const handleSwitchPath =(groupId:string)=>{
    //fetch the folders.
    //update the folderDepth
    //update the path

  }
  const handleCheckOn=(name:string,isFolder:boolean)=>{
        updateSelectedNameId({Name_Id:name,isFolder})
  }

useEffect(()=>{

},[selectedNameId])

  return (
    <div className="w-full h-full ">
      <div className="p-4 flex justify-between items-center">
        <div className="flex w-11/12">
          <div>
            <input className="title text-sm btn" type="file" />
          </div>
          <button
            className="md:ml-4 btn w-36"
            onClick={() => updateFoldersCount(foldersCount + 1)}
          >
            <span className="title  text-sm">Create A Folder</span>
          </button>
        </div>

        <div className="flex w-full items-center justify-center">
        <img src={del_icon} alt="delete" height={40} width={40}></img>
        <img src={show_property} alt="properties" height={40} width={40} className="md:ml-5 ml-1" />
        </div>

      </div>
      <div className="address-bar">
        <AddrBar path={path} />
      </div>
      <div className="flex w-full h-full justify-between ">
        <div className="pt-5 p-8 min-w-80 w-auto md:h-3/5 h-4/5 folders overflow-auto overflow-x-hidden  mb-5">
          {(
            new Array(foldersCount)
              .fill(0)
              .map((item, key) => (
                <Folder
                  key={key}
                  newlyCreated={true}
                  userId={user?.id}
                  name=""
                  handleSwitchPath={handleSwitchPath}
                  isChecked={false}
                  handleCheckOn={handleCheckOn}
                  updateFoldersCount={updateFoldersCount}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FolderWindow;
