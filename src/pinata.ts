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
    return response;
  } catch (e) {
  }
};
export const handleDeleteGroup = async (GroupId: string) => {
  try {
  await pinata.groups.delete({ groupId: GroupId });
    return 1;

  } catch (e) {
  }
};

export const handleDeleteFile = async (groupId: string,fileId:string) => {
  try {
    await pinata.groups.removeFiles({
      groupId:groupId,
      files: [
        fileId,
      ],
    });
    return true
  } catch (e) {
    return false
  }
};

export const handleCreateFileInGroup = async (args: createFileInGroup) => {
  if (args?.file)
    try {
      const response = await pinata.upload
        .file(args.file)
        .group(args.group_name);
      return response;
    } catch (e) {
    }
};

export const handleRetrieveFiles = async (group_id: string) => {
  try {
    const response: FileListResponse = await pinata.files
      .list()
      .group(group_id);
    return response;
  } catch (e: any) {
    throw new Error(e);
  }
};

export const handleRetrieveGroups = async () => {
  try {
    const groups = await pinata.groups.list();
    return groups;
  } catch (e: any) {
    throw new Error(e);
  }
};


export const handleFilteredGroups = (
  groups: GroupResponseItem[],
  userId: string
) => {
  return groups.filter((item) => item.name.startsWith(userId));
};
