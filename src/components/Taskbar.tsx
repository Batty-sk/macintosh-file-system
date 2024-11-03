import { useState,useEffect } from 'react';
import { github } from '../assets'
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
        <span className='ml-5  title'>
                      saorav.skumar@gmail.com 💓
                    </span>
        </div>
        <div>
            <div className=' flex flex-col items-center '>
                    <span className=' font-semibold title text-sm'>{currentTime.toTimeString().split(' ')[0]
                    } </span>    
                    <span className='font-semibold title text-sm'>
                        {currentTime.toDateString()}</span>  

            </div>
        </div>
    </div>
  )
}

export default Taskbar
