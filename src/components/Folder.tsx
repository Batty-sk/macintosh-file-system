import React, { useState } from 'react'
import { folder,close,correct } from '../assets'

type Props={
    newlyCreated:boolean,
    name:string
}
const Folder = ({newlyCreated,name}:Props) => {
    const [isNewlyCreated,updateIsNewlyCreated]=useState(!newlyCreated)
    const [folderName,updateFolderName]=useState('')

    const handleDoneEditing=()=>{
        //we call the pinaata api.
        updateIsNewlyCreated(true)
    }
    
    const handleReset=()=>{
        updateFolderName('')
    }
  return (
    <div className='flex items-center '>
        <img src={folder} alt="folder" height={48} width={48} />
    
        {!isNewlyCreated?
     <>
        <input type="text" value={!newlyCreated?name:folderName} onChange={!newlyCreated?()=>{}:(e)=>{updateFolderName(e.target.value)}} />
        <div className='flex'>
                <img src={correct} height={20} width={20} alt="" onClick={()=>{
                    handleDoneEditing();
                }} className='cursor-pointer'/>
                <img src={close} height={20} width={20} alt="" className='ml-2 cursor-pointer' onClick={()=>{
                    handleReset();
                }} />
        </div>
        </>
        :<span className='pl-2'>{name?name:folderName}</span>}
    </div>
  )
}

export default Folder
