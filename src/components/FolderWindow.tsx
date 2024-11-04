import '../index.css'
import { search } from '../assets'
import Folder from './Folder'
import { useEffect, useState } from 'react'
import AddrBar from './AddrBar'
import { useUser } from "@clerk/clerk-react";
import { handleRetrieveFiles } from '../pinata'
import { handleRetrieveGroups,handleFilteredGroups } from '../pinata'
import { FilteredGroupsProp } from '../pinata'


const FolderWindow = () => {
  const { isLoaded, isSignedIn, user } = useUser(); 
  const [path,updatePath] = useState("/home") 
  const [folderDepth,updateFolderDepth]=useState(1)

   // if useeffect runs on the clicking on the folder then we can increase the count
   // this count will restrict the user from creating another folder couwe can display the dialog box modal  
  useEffect(()=>{
    const retrieveGroups= async ()=>{
    if(user?.id==undefined)
        return 0;
    const groups = await handleRetrieveGroups()
    if(groups){
    const filteredGroups = handleFilteredGroups(groups.groups,user?.id);
    console.log('filtered Groups!',filteredGroups)
    }
      }
      retrieveGroups()
  },[])
  
  const handleUploadFileToPinata =(file:File)=>{

  }
  const [foldersCount,updateFoldersCount] = useState(0)
  const [filesCount,updateFilesCount] = useState(0)

  return (
    <div className='w-full h-full '>
        <div className='p-4 flex justify-between items-center'>
            <div className='flex'>
              <div>
            <input className='title text-sm btn' type='file'  />
            </div>
            <button className='md:ml-4 btn' onClick={()=>updateFoldersCount(foldersCount+1)}>
            <span className='title text-sm'>Create A Folder</span>
            </button>
            </div>
            <div className='flex items-center'>
            <img src={search} height={28} width={28} alt="" className='me-2' />
            <input aria-label="Example text box" type="text" placeholder="Search" className='min-w-10'/>

            </div>
   
        </div>
        <div className='address-bar'>
      <AddrBar path={path}/>
        </div>

        <div className='flex w-full h-full justify-center '>
        <div className='pt-5 p-8 w-11/12 h-full folders overflow-auto mb-5'>

      {!foldersCount && !filesCount?<h1 className='title text-2xl'>No Folders And Files.</h1>:new Array(foldersCount).fill(0).map((item,key)=>(<Folder key={key} newlyCreated={true} userId={user?.id} name='' />))}
        </div>
        </div>
    </div>
  )
}

export default FolderWindow
