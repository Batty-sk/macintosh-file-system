import { Link } from 'react-router-dom'
import { fileTypeImgFinder } from '../utils'

type Prop={
id:string,
isChecked:boolean,
cid:string,
fileName:string|null,
mimeType:string,


handleCheckOn: (name:string,isFolder:boolean) => void;

}

const File = ({id,isChecked,cid,fileName,handleCheckOn,mimeType
}:Prop) => {

    const handleChangeEvent =()=>{
        if(isChecked){
            return 
        }
        handleCheckOn(id,false)
    }
  return (
       <div className="field-row mt-2">
        <input
          id={id}
          type="radio"
          name="first-example"
          checked={isChecked}
          onChange={() => handleChangeEvent()}
        />
        <label htmlFor={id}></label>
        <Link to={`https://lime-rapid-crayfish-43.mypinata.cloud/files/${cid}`} target='_blank' className='flex items-center'>
            <img src={fileTypeImgFinder(mimeType)} alt="file" className='md:w-8 md:h-8 w-6 h-6'/>
            <h2 className='title text-sm ml-1'>{fileName}</h2>
        </Link>
      </div>
  )
}

export default File
