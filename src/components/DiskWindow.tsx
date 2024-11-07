import { disk } from '../assets';
import '../index.css';
import { useContext, useEffect, useState } from 'react';
import { F_F_Context } from '../contexts/FoldersAndFilesContext';

type Prop = {
  updateSwitchWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DiskWindow = ({ updateSwitchWindow }: Prop) => {
  const [mouseDown, updateMouseDown] = useState(false);
  const [totalDiskUsed, updateTotalDiskUsed] = useState(0);
  const { Files } = useContext(F_F_Context);

  useEffect(() => {
    if (Files.length) {
      let sumOfFileSizes = 0;
      Files.forEach((item) => {
        sumOfFileSizes += item.size;
      });
      console.log('files size', sumOfFileSizes);
      updateTotalDiskUsed(sumOfFileSizes);
    }
  }, [Files]);

  const handleMouseDown = () => updateMouseDown(true);
  const handleMouseUp = () => updateMouseDown(false);
  const handleTouchStart = () => updateMouseDown(true);
  const handleTouchEnd = () => updateMouseDown(false);

  return (
    <div className="flex justify-start w-full md:p-16 pt-8 px-2">
      <div
        className={`flex md:w-8/12 w-full btn p-5 items-center ${mouseDown ? 'bg-black' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => updateSwitchWindow(true)}
      >
        <img
          src={disk}
          alt=""
          className={`md:w-20 md:h-14 w-10 h-9 ${mouseDown ? 'filter invert' : ''}`}
        />
        <div className="w-full pl-6 flex flex-col relative">
          <div className="text-start">Pinata disk (c)</div>
          <div className="w-full h-6 border border-black">
            <div
              className="h-full bg-green-800"
              style={{
                width: `${(totalDiskUsed / 1073741824) * 100}%`,
              }}
            ></div>
          </div>
          <div className="pt-2 flex justify-start">
            <span className="title text-sm font-semibold">
              Used {(totalDiskUsed / 1073741824).toFixed(5)} GB of 1 GB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiskWindow;
