import React, { useState, useEffect, useRef } from "react";

const MinimalFullHeightTextArea = ({ onLineCountChange }) => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    // Set initial height
    adjustHeight();

    // Handle window resize
    window.addEventListener("resize", adjustHeight);
    return () => window.removeEventListener("resize", adjustHeight);
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      // Get parent height and set textarea to same height
      const parentHeight = textareaRef.current.parentElement.offsetHeight;
      textareaRef.current.style.height = `${parentHeight}px`;
    }
  };

  // Count lines and notify parent component
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    // Count number of lines
    const lineCount = (newText.match(/\n/g) || []).length + 1;

    if (onLineCountChange) {
      onLineCountChange(lineCount);
    }
  };

  return (
    <textarea
      ref={textareaRef}
      value={text}
      onChange={handleTextChange}
      className="w-full h-full bg-white border-0 p-4 focus:outline-none focus:ring-0 resize-none overflow-y-auto text-gray-700"
      placeholder="Please enter the text or draft you would like to edit..."
    />
  );
};

export default MinimalFullHeightTextArea;
