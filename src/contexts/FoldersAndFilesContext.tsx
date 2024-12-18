import { createContext } from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { handleCreateGroup } from "../pinata";
import { GroupResponseItem } from "pinata";

import {
  handleRetrieveFiles,
  handleRetrieveGroups,
  handleFilteredGroups,
} from "../pinata";


type FileListItem = {
  id: string;
  name: string | null;
  cid: "pending" | string;
  size: number;
  number_of_files: number;
  mime_type: string;
  keyvalues?: Record<string, string>;
  group_id: string | null;
  created_at: string;
}

type ChildProp = {
  children: ReactNode;
};
type ContextProps = {
  Files: FileListItem[];
  Folders: GroupResponseItem[];
  setFolders: React.Dispatch<React.SetStateAction<GroupResponseItem[]>>
  setFiles:React.Dispatch<React.SetStateAction<FileListItem[]>>
};
export const F_F_Context = createContext<ContextProps>({
  Files: [],
  Folders: [],
  setFolders:()=>{},
  setFiles:()=>{}
});

export const F_F_Context_Wrapper = ({ children }: ChildProp) => {
  const { user } = useUser();

  const [Folders, setFolders] = useState<GroupResponseItem[]>([]);
  const [Files, setFiles] = useState<FileListItem[]>([]);

  useEffect(() => {
    const retrieveFilesAndFolders = async () => {
      try {
        const G_Data = await handleRetrieveGroups();
        if (user == undefined) throw new Error("user not found!");
        const Filtered_G_Data: GroupResponseItem[] = handleFilteredGroups(
          G_Data.groups,
          user?.id
        );
        if(!Filtered_G_Data.length){
          //this means there is no root folder
          try{
            const data=await handleCreateGroup({name:user.id})
            if(data)
              Filtered_G_Data.push(data)
            }
          catch{
            console.log('something went wrong while creating the root folder ')
            
          }
        }
        let FILES: FileListItem[] = [];

        await Promise.all(
          Filtered_G_Data?.map(async (item) => {
            const Files = await handleRetrieveFiles(item.id);
            FILES.push(...Files.files);
            console.log("files first...");
          })
        );
        console.log("groups", Filtered_G_Data);
        console.log("Files", FILES);
        setFolders(Filtered_G_Data);
        setFiles(FILES);
      } catch (e) {
        console.log("error found! couldn't retrieve the files and folders", e);
        return;
      }
    };
    retrieveFilesAndFolders();
  }, []);

  return (
    <F_F_Context.Provider value={{ Files: Files, Folders: Folders,setFolders,setFiles }}>
      {children}
    </F_F_Context.Provider>
  );
};
