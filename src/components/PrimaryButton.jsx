import { useState } from "react";
import { Check, X, SendHorizontal } from "lucide-react";

export default function PrimaryButton() {
  const [isInput, setIsInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    setIsInput(true);
  };

  const handleConfirm = () => {
    // Handle the input confirmation here
    console.log("Confirmed input:", inputValue);
    setIsInput(false);
  };

  const handleCancel = () => {
    setInputValue("");
    setIsInput(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center my-4">
      {!isInput ? (
        <button
          onClick={handleButtonClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center transition-all"
        >
          <span className="mr-2">⚡</span>
          <span>Automatic draft generation</span>
        </button>
      ) : (
        <div className="flex items-center space-x-2 transition-all duration-300">
          <div
            className={`
        flex items-center border border-gray-300 rounded-full px-3 py-2 
        transition-all duration-300 ease-in-out 
        ${isInput ? "w-[36rem] max-w-full" : "w-48"}
      `}
          >
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Write a report analyzing the trends and challenges in anticancer drug development"
              className="flex-grow outline-none bg-transparent"
              autoFocus
            />
            <button
              onClick={handleConfirm}
              className="ml-2 bg-purple-100 p-1 rounded-full"
            >
              <SendHorizontal size={16} className="text-purple-600" />
            </button>
          </div>

          <button
            onClick={handleCancel}
            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
            title="Cancel"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
}
