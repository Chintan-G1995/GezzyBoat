import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ChatInput from "./components/ChatInput";
import PrimaryButton from "./components/PrimaryButton";
import FloatingToolbar from "./components/FloatingToolbar";
import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [lineCount, setLineCount] = useState(1);
  const [maxButtonOffset, setMaxButtonOffset] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setMaxButtonOffset(containerHeight - 60);
    }
  }, []);

  const getButtonTopPosition = () => {
    const lineHeight = 24;
    const initialOffset = 24;
    const calculatedOffset = initialOffset + (lineCount - 1) * lineHeight;
    return Math.min(calculatedOffset, maxButtonOffset);
  };

  const handleLineCountChange = (count) => {
    setLineCount(count);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-black p-1 overflow-hidden">
      {/* Sidebar */}
      <div className="w-full lg:w-[5%]">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-full lg:w-[95%] flex flex-col bg-white border-t border-black rounded-lg overflow-hidden">
        <TopBar />

        <div className="flex flex-col lg:flex-row flex-1 overflow-auto">
          {/* Left Section */}
          <div
            ref={containerRef}
            className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-200 relative text-gray-500 text-sm"
          >
            <div className="h-full relative">
              <ChatInput onLineCountChange={handleLineCountChange} />

              {/* Floating Button */}
              <div
                className="absolute left-4 transition-all duration-200"
                style={{ top: `${getButtonTopPosition()}px` }}
              >
                <PrimaryButton />
              </div>
            </div>

            {/* Floating Toolbar */}
            <div className="hidden md:block absolute top-60 right-0 transform translate-x-1/2">
              <FloatingToolbar />
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
