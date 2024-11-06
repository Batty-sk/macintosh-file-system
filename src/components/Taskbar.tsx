import { useState,useEffect } from 'react';
import { github,heart } from '../assets'
import "../index.css"
const Taskbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const timerId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
  
      return () => clearInterval(timerId);
    }, []);

  return (
    
    <div className='w-full h-12 flex justify-between items-center p-4 separator bg-white '>
        <div className='flex justify-center items-center'>
        <img src={github} alt="start" height={32} width={32}  className='cursor-pointer'/>
        <h2 className='ml-5 title flex items-center text-sm'>
        saorav.skumar@gmail.com  <img src={heart} alt="" height={20} width={30}/>

          </h2>

        </div>
        <div>
            <div className=' flex flex-col items-center '>
                    <h2 className=' title text-sm'>{currentTime.toTimeString().split(' ')[0]
                    } </h2>    
                    <h2 className=' title text-sm'>
                        {currentTime.toDateString()}</h2>  

            </div>
        </div>
    </div>
  )
}

export default Taskbar
