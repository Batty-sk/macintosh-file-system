import { useState,useEffect } from 'react';
import { github,heart } from '../assets'
import { Link } from 'react-router-dom';
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
        <div className='flex md:justify-center justify-start items-center'>
          <Link to={'https://github.com/Batty-sk'}>
        <img src={github} alt="start"  className='cursor-pointer md:w-8 w-6'/>
        </Link>
        <h2 className='ml-5 title flex items-center md:text-sm text-[10px]'>
        saorav.skumar@gmail.com  <img src={heart} alt="" height={20} width={30} className='md:w-8 w-6'/>

          </h2>

        </div>
        <div>
            <div className=' flex flex-col items-center '>
                    <h2 className='title md:text-sm text-[10px]'>{currentTime.toTimeString().split(' ')[0]
                    } </h2>    
                    <h2 className=' title md:text-sm text-[10px]'>
                        {currentTime.toDateString()}</h2>  

            </div>
        </div>
    </div>
  )
}

export default Taskbar
