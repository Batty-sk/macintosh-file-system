import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_PINATA_JWT!,
  pinataGateway: "example-gateway.mypinata.cloud",
});

type createGroupProps = {
    name:string
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


export const handleRetrieveFiles = async()=>{

}

export const handleRetrieveGroups=async()=>{
    const groups = await pinata.groups.list()

    return groups
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