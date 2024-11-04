import { PinataSDK } from "pinata";


const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud",
});

type createGroupProps = {
    name:string
}
type createFileInGroup = {
    file?:File,
    group_name:string
}
export const handleCreateGroup = async(args:createGroupProps)=>{ 
   try{const response = await pinata.groups.create({name:args.name,isPublic:true})
   console.log("response we got brou",response)
   return response

    }
    catch(e){
        console.log('error while creating a group',e)
    }

}                                                                  

export const handleCreateFileInGroup = async(args:createFileInGroup)=>{
    if(args?.file)
    try{
        const response = await pinata.upload.file(args.file).group(args.group_name)
    console.log("response we got on uploading file ",response)
    return response
 
     }
     catch(e){
         console.log('error while uploading file',e)
     }
}

export const handleRetrieveFiles = async(args:createFileInGroup)=>{
    try{const response = await pinata.files.list().group(args.group_name)
        console.log("response we got on uploading file ",response)
        return response
     
         }
         catch(e){
             console.log('error while uploading file',e)
         }
}

export const handleRetrieveGroups=async()=>{
   try{ const groups =await pinata.groups.list()
    return groups
   }
   catch(e){
    console.log('error while retriving the groups.')
   }
}


export type FilteredGroupsProp = {
    id:string,
    name:string,
    is_public:boolean,
    created_at?:string
}
export const handleFilteredGroups=(groups:FilteredGroupsProp[],userId:string)=>{

    return groups.filter((item,index)=>item.name.startsWith(userId))

}