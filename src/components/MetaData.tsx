import React from 'react'

type metaDataProps={
name:string,
dateOfCreation:string,
fileType:string,
size?:number
handleOkMetaData:()=>void
}
const MetaData = ({name,dateOfCreation,fileType,size,handleOkMetaData}:metaDataProps) => {
  return (
    <div className=' w-80 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30'>
<div className="standard-dialog center scale-down w-full p-3 flex flex-col overflow-x-hidden ">
    <div className='flex mt-2'>
        <h1 className='title font-semibold text-sm'>name:</h1> <h2 className='title font-light text-sm pl-2'>{name}</h2>
    </div>
    {fileType!='Folder' &&
    <div className='flex mt-2'>
        <h1 className='title font-semibold text-sm'>Date Of Creation:</h1> <h2 className='title font-light pl-2 text-sm'>{dateOfCreation}</h2>
    </div>
    
        }    
        <div className='flex mt-2'>
        <h1 className='title font-semibold text-sm'>File Type:</h1> <h2 className='title font-light  pl-2 text-sm'>{fileType}</h2>
    </div>
    {fileType!='Folder' &&
    <div className='flex mt-2'>
        <h1 className='title font-semibold text-sm'>Size:</h1> <h2 className='title font-light pl-2 text-sm'>{size}</h2>
    </div>
}
  <p className="dialog-text btn mt-5" onClick={handleOkMetaData}> OK </p>
</div>
</div>
  )
}

export default MetaData
