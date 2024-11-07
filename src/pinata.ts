import { PinataSDK } from "pinata";
import { FileListResponse } from "pinata";
import { GroupResponseItem } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud",
});

type createGroupProps = {
  name: string;
};
type createFileInGroup = {
  file?: File;
  group_name: string;
};
export const handleCreateGroup = async (args: createGroupProps) => {
  try {
    const response = await pinata.groups.create({
      name: args.name,
      isPublic: true,
    });
    console.log("response we got brou", response);
    return response;
  } catch (e) {
    console.log("error while creating a group", e);
  }
};
export const handleDeleteGroup = async (GroupId: string) => {
  try {
    const response = await pinata.groups.delete({ groupId: GroupId });
    console.log("response we got brou", response);
    return 1;

  } catch (e) {
    console.log("error while deleting a group", e);
  }
};

export const handleDeleteFile = async (groupId: string,fileId:string) => {
  try {
    const group = await pinata.groups.removeFiles({
      groupId:groupId,
      files: [
        fileId,
      ],
    });
    return true
  } catch (e) {
    console.log("error while deleting a group", e);
    return false
  }
};

export const handleCreateFileInGroup = async (args: createFileInGroup) => {
  if (args?.file)
    try {
      const response = await pinata.upload
        .file(args.file)
        .group(args.group_name);
      console.log("response we got on uploading file ", response);
      return response;
    } catch (e) {
      console.log("error while uploading file", e);
    }
};

export const handleRetrieveFiles = async (group_id: string) => {
  try {
    const response: FileListResponse = await pinata.files
      .list()
      .group(group_id);
    console.log("response we got on retrieving the file ", response);
    return response;
  } catch (e: any) {
    console.log("error while uploading file", e);
    throw new Error(e);
  }
};

export const handleRetrieveGroups = async () => {
  try {
    const groups = await pinata.groups.list();
    return groups;
  } catch (e: any) {
    console.log("error while retriving the groups.");
    throw new Error(e);
  }
};


export const handleFilteredGroups = (
  groups: GroupResponseItem[],
  userId: string
) => {
  return groups.filter((item, index) => item.name.startsWith(userId));
};
