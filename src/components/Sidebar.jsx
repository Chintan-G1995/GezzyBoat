import { FaPlus, FaFileAlt, FaFolder, FaThLarge } from "react-icons/fa";
import { PiSquaresFourFill } from "react-icons/pi";
import { FaRegFileAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-16 h-screen bg-[#121117] flex flex-col justify-between items-center py-4">
      {/* Top Section */}
      <div className="flex flex-col items-center space-y-6">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500" />

        <div className="w-8 h-8 bg-[#1e1e24] rounded-md flex items-center justify-center">
          <FaPlus className="text-white text-sm" />
        </div>

        <FaFolder className="text-white text-lg" />

        <FaThLarge className="text-white text-lg" />
      </div>

      <div className="w-8 h-8 bg-violet-500 text-white rounded-md flex items-center justify-center font-semibold">
        M
      </div>
    </div>
  );
};

export default Sidebar;
