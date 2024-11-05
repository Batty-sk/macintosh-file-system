import { createContext } from "react";
import { ReactNode, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { FilteredGroupsProp } from "../pinata";
import { FileListItem } from "pinata";

import {
  handleRetrieveFiles,
  handleRetrieveGroups,
  handleFilteredGroups,
} from "../pinata";

type ChildProp = {
  children: ReactNode;
};
type ContextProps = {
  Files: FileListItem[];
  Folders: FilteredGroupsProp[];
  setFolders: React.Dispatch<React.SetStateAction<FilteredGroupsProp[]>>
  setFiles:React.Dispatch<React.SetStateAction<FileListItem[]>>
};
export const F_F_Context = createContext<ContextProps>({
  Files: [],
  Folders: [],
  setFolders:()=>{},
  setFiles:()=>{}
});

export const F_F_Context_Wrapper = ({ children }: ChildProp) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const [Folders, setFolders] = useState<FilteredGroupsProp[]>([]);
  const [Files, setFiles] = useState<FileListItem[]>([]);

  useEffect(() => {
    const retrieveFilesAndFolders = async () => {
      try {
        const G_Data = await handleRetrieveGroups();
        if (user == undefined) throw new Error("user not found!");
        const Filtered_G_Data: FilteredGroupsProp[] = handleFilteredGroups(
          G_Data.groups,
          user?.id
        );
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
