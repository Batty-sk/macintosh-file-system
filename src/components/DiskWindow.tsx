import { disk } from '../assets'
import '../index.css'
type Prop={
  updateSwitchWindow:React.Dispatch<React.SetStateAction<boolean>>
}
const DiskWindow = ({updateSwitchWindow}:Prop) => {
  return (
    <div className="flex justify-start w-full p-16">
    <div className="flex w-8/12 btn p-5" onClick={()=>updateSwitchWindow(true)}>
      <img src={disk} alt="" height={85} width={85} /* style={{filter:'invert()'}} *//>
       <div className="w-full pl-6 flex flex-col  relative ">
        <div className='text-start'>Pinata disk (c)</div>
       <div className='w-full h-6 border border-black'>
         <div className="h-full w-1 bg-green-800 ">
         </div>
         </div>

         <div className='pt-2 flex justify-start'>
          <span className='title  text-sm font-semibold'>
              Free 1GB of 1GB
          </span>
         </div>
       </div>
    </div>
  </div>
  )
}

export default DiskWindow
