import React, { useState } from "react";
import { BiSolidCommentEdit } from "react-icons/bi";
import { MdOutlineSettingsEthernet } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const FloatingToolbar = () => {
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("userSettings");
  const [formData, setFormData] = useState({
    documentScale: 1,
    targetAudience: "general",
    additionalDetails: "",
  });

  // Custom Tooltip component
  const Tooltip = ({ label, placement, children }) => {
    return (
      <div className="relative group">
        {children}
        <div
          className={`absolute ${
            placement === "left" ? "right-full mr-2" : "left-full ml-2"
          } top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}
        >
          {label}
        </div>
      </div>
    );
  };

  
  const toggleSettingsPopup = () => {
    setShowSettingsPopup(!showSettingsPopup);
  };

  
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    toggleSettingsPopup();
  };

  return (
    <>
      {/* Main floating toolbar */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-10">
        <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex flex-col items-center">
          <Tooltip label="Edit" placement="left">
            <button className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <BiSolidCommentEdit className="text-gray-500 w-5 h-5" />
            </button>
          </Tooltip>

          <Tooltip label="Adjust Length" placement="left">
            <button className="p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <MdOutlineSettingsEthernet className="text-gray-500 w-5 h-5" />
            </button>
          </Tooltip>

          <div className="w-full h-px bg-gray-200 my-2"></div>

          <Tooltip label="Settings" placement="left">
            <button
              className="p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              onClick={toggleSettingsPopup}
            >
              <LuSettings2 className="text-gray-500 w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Settings Popup Form */}
      {showSettingsPopup && (
        <Popup
          open={showSettingsPopup}
          position="center"
          modal
          nested
          closeOnDocumentClick={false}
        >
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-transition bg-opacity-30">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              {/* Form Header with close button */}
              <div className="flex justify-between items-center px-4 py-3 border-b">
                <h2 className="text-lg font-medium">Settings</h2>
                <button
                  onClick={toggleSettingsPopup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IoClose size={20} />
                </button>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-2 px-4 text-center text-sm ${
                    activeTab === "userSettings"
                      ? "text-blue-500 font-medium border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("userSettings")}
                >
                  User Settings
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center text-sm ${
                    activeTab === "contentType"
                      ? "text-blue-500 font-medium border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("contentType")}
                >
                  Content Type
                </button>
                <button
                  className={`flex-1 py-2 px-4 text-center text-sm ${
                    activeTab === "wordCount"
                      ? "text-blue-500 font-medium border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("wordCount")}
                >
                  Word Count
                </button>
              </div>

              {/* Form Content */}
              {activeTab === "userSettings" && (
                <form onSubmit={handleSubmit}>
                  {/* Document Scale Section */}
                  <div className="p-4 border-b">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs mr-2">
                        1
                      </div>
                      <label
                        htmlFor="documentScale"
                        className="text-sm font-medium"
                      >
                        Document Scale
                      </label>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500">Business</span>
                      <span className="text-xs text-gray-500">Academic</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <div className="flex-1 relative h-1 bg-gray-200 rounded-full">
                        <div
                          className="absolute left-0 h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${(formData.documentScale / 4) * 100}%`,
                          }}
                        ></div>
                        {[0, 1, 2, 3, 4].map((index) => (
                          <button
                            type="button"
                            key={index}
                            className={`absolute w-3 h-3 rounded-full -mt-1 -ml-1.5 focus:outline-none ${
                              formData.documentScale === index
                                ? "bg-blue-500 ring-2 ring-blue-300"
                                : "bg-gray-300"
                            }`}
                            style={{ left: `${index * 25}%` }}
                            onClick={() =>
                              handleInputChange("documentScale", index)
                            }
                          ></button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Target Audience Section */}
                  <div className="p-4 border-b">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs mr-2">
                        2
                      </div>
                      <span className="text-sm font-medium">
                        Target Audience
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        "General",
                        "Student",
                        "Business",
                        "Developer",
                        "Custom",
                      ].map((option) => (
                        <button
                          type="button"
                          key={option.toLowerCase()}
                          className={`py-2 px-1 text-xs rounded-lg text-center ${
                            formData.targetAudience === option.toLowerCase()
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            handleInputChange(
                              "targetAudience",
                              option.toLowerCase()
                            )
                          }
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Details Section */}
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full text-xs mr-2">
                        3
                      </div>
                      <label
                        htmlFor="additionalDetails"
                        className="text-sm font-medium"
                      >
                        Additional Details
                      </label>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <textarea
                        id="additionalDetails"
                        name="additionalDetails"
                        className="w-full h-16 bg-gray-50 border-none text-sm resize-none focus:ring-0 focus:outline-none"
                        placeholder="Enter additional information for better results..."
                        value={formData.additionalDetails}
                        onChange={(e) =>
                          handleInputChange("additionalDetails", e.target.value)
                        }
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-6 rounded-full text-sm font-medium"
                      >
                        Apply Settings
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Content Type Tab */}
              {activeTab === "contentType" && (
                <form onSubmit={handleSubmit}>
                  <div className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                          Format Type
                        </label>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                          >
                            General
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Academic
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Business
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Style</label>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Formal
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                          >
                            Neutral
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Casual
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 mt-2">
                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 rounded-full text-sm font-medium"
                        >
                          Apply Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Word Count Tab */}
              {activeTab === "wordCount" && (
                <form onSubmit={handleSubmit}>
                  <div className="p-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="wordCount"
                          className="text-sm font-medium"
                        >
                          Word Count
                        </label>
                        <div className="flex items-center">
                          <input
                            id="wordCount"
                            type="range"
                            min="100"
                            max="1000"
                            step="100"
                            defaultValue="500"
                            className="mr-2"
                          />
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            500
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">
                          Complexity
                        </label>
                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Simple
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-md"
                          >
                            Medium
                          </button>
                          <button
                            type="button"
                            className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
                          >
                            Complex
                          </button>
                        </div>
                      </div>

                      <div className="pt-4 mt-2">
                        <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 rounded-full text-sm font-medium"
                        >
                          Apply Word Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export default FloatingToolbar;
