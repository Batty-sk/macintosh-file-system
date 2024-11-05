import "../index.css"
import { back } from "../assets"

type Prop ={
  path:string
  handleBackPath:()=>void
}
const AddrBar = ({path,handleBackPath}:Prop) => {

  
  return (
    <div className='w-8/12 ml-5 flex '>
      {path!='/home'?<img src={back} alt="Back" className="cursor-pointer" height={20} width={20} onClick={handleBackPath}/>
:null}
      <p className='title text-sm ml-2 '>{path}</p>
    </div>
  )
}

export default AddrBar
