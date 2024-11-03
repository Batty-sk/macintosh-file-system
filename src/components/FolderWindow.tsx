import '../index.css'
import { search } from '../assets'
import Folder from './Folder'
import { useState } from 'react'
import AddrBar from './AddrBar'
const FolderWindow = () => {
   
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
      <AddrBar/>
        </div>

        <div className='flex w-full h-full justify-center '>
        <div className='pt-5 p-8 w-11/12 h-full folders overflow-auto mb-5'>
      {!foldersCount && !filesCount?<h1 className='title text-2xl'>No Folders And Files.</h1>:new Array(foldersCount).fill(0).map((item,key)=>(<Folder key={key} newlyCreated={true} name='' />))}
        </div>
        </div>
    </div>
  )
}

export default FolderWindow
