import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* iPhone Frame */}
      <div className="relative">
        {/* Phone Body */}
        <div className="relative w-[390px] h-[844px] bg-black rounded-[60px] shadow-2xl p-3 border-[14px] border-gray-900">
          {/* Inner Bezel */}
          <div className="w-full h-full bg-white rounded-[46px] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-3xl z-50">
              {/* Speaker */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-800 rounded-full"></div>
              {/* Camera */}
              <div className="absolute top-2 left-[20px] w-3 h-3 bg-gray-900 rounded-full border border-gray-700"></div>
            </div>
            
            {/* Screen Content */}
            <div className="w-full h-full overflow-auto">
              {children}
            </div>
          </div>
        </div>
        
        {/* Side Buttons */}
        {/* Volume Buttons */}
        <div className="absolute left-[-4px] top-[120px] w-1 h-12 bg-gray-900 rounded-l-sm"></div>
        <div className="absolute left-[-4px] top-[180px] w-1 h-12 bg-gray-900 rounded-l-sm"></div>
        
        {/* Power Button */}
        <div className="absolute right-[-4px] top-[160px] w-1 h-20 bg-gray-900 rounded-r-sm"></div>
      </div>
    </div>
  );
}
