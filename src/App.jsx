import React, { useState, useEffect, useRef } from "react";
import ImageIcon from "./assets/images/image-svgrepo-com.svg?react";
import SettingsIcon from "./assets/images/settings-icon.svg?react";
import AttachmentIcon from "./assets/images/file-icon.svg?react";
import PersonIcon from "./assets/images/user-icon.svg?react";
import ChatIcon from "./assets/images/chat-icon.svg?react";
import ListIcon from "./assets/images/list-icon.svg?react";
import FileItemIcon from "./assets/images/document-item.svg?react";
import FolderItemIcon from "./assets/images/folder-item.svg?react";
import "./App.css";
import QuickAccess from "./components/QuickAccess";
import ItemOptions from "./components/ItemOptions";
import { useAppContext } from "./context/AppContext";
import UserModel from "./models/UserModel";
import FileModel from "./models/FileModel";
import FolderModel from "./models/FolderModel";
import ChatModel from "./models/ChatModel";
import { getDateTime } from "./utils/DateTimeFormatter";
import ShimmerEffect from "./components/ShimmerLoader";
import Cursor from "./components/Cursor";
import CircularProgressIndicator from "./components/CircularProgressIndicator";

// Inline SVGs for the icons
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#a3a3a3"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    height={48}
    width={48}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const App = () => {
  // Get data and state from context
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    filteredData,
    loading,
    getCount,
  } = useAppContext();

  // State to control the visibility of the popup overlay.
  const [showOverlay, setShowOverlay] = useState(false);
  // Ref for the popup element to handle clicks outside of it.
  const popupRef = useRef(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [tabs, setTabs] = useState([
    { name: "All", key: "all", active: true },
    { name: "Files", key: FileModel.type, icon: AttachmentIcon, active: true },
    { name: "People", key: UserModel.type, icon: PersonIcon, active: true },
    { name: "Chats", key: ChatModel.type, icon: ChatIcon, active: true },
    { name: "Lists", key: FolderModel.type, icon: ListIcon, active: true },
  ]);

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If the overlay is visible and the click is outside the popup, close it.
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    // Add the event listener when the overlay is shown.
    if (showOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when the component unmounts or the overlay is hidden.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOverlay]);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleToggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  const handleSettingsMenuToggle = (key) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.key === key ? { ...tab, active: !tab.active } : tab
      )
    );
  };

  // Loading state
  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div style={containerStyle}>
      <Cursor />
      <div style={cardStyle}>
        {/* Search Bar */}
        <div style={searchContainerStyle}>
          {loading ? (
            <CircularProgressIndicator />
          ) : (
            <SearchIcon style={searchIconStyle} />
          )}
          <input
            type="text"
            style={searchInputStyle}
            placeholder="Searching is easier"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery.trim().length == 0 ? (
            <QuickAccess />
          ) : (
            <button onClick={() => setSearchQuery("")} style={clearBtnStyle}>
              Clear
            </button>
          )}
        </div>

        {/* Tabs and Settings */}
        <div style={headerStyle}>
          <div style={tabsStyle}>
            {tabs
              .filter((tab) => tab.active)
              .map((tab) => (
                <div
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    ...tabStyle,
                    ...(activeTab === tab.key ? tabActiveStyle : {}),
                  }}
                >
                  {tab.icon && <tab.icon style={tabIconStyle} />}
                  <span>{tab.name}</span>
                  <span style={tabCountStyle}>{getCount(tab.key)}</span>
                </div>
              ))}
          </div>
          <div onClick={handleToggleOverlay}>
            <SettingsIcon
              style={settingsIconStyle}
              className={`icon-svg ${showOverlay ? "rotate" : ""}`}
            />
          </div>
          {showOverlay && (
            <div className="overlay">
              <div className="popup" ref={popupRef}>
                <div className="popup-content">
                  {tabs
                    .filter((tab) => tab.key !== "all")
                    .map((tab) => (
                      <div className="popup-item" key={tab.key}>
                        <div className="popup-item-label">
                          {tab.icon && <tab.icon style={tabIconStyle} />}
                          <span>{tab.name}</span>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={tab.active}
                            onChange={() => handleSettingsMenuToggle(tab.key)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results List */}
        <div style={resultsListStyle}>
          {(filteredData || []).map((item, index) => (
            <div
              key={`${item.type}_${item.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                // borderRadius: "0.75rem",
                transition: "background-color 0.2s ease-in-out",
                cursor: "none",
                borderBottom:
                  index != filteredData.length - 1 ? "2px solid #f1f1f1" : null,
                backgroundColor:
                  hoveredId === item.id ? "#f5f5f5" : "transparent",
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Profile/File Icon Section */}
              <div style={itemIconContainerStyle}>
                {(item.type === "user" || item.type === "chat") && (
                  <>
                    <img
                      src={item.profilePicture}
                      alt={item.name}
                      style={personImageStyle}
                    />
                    <div
                      style={{
                        ...statusDotStyle,
                        ...(item.isActive
                          ? statusActiveStyle
                          : statusInactiveStyle),
                      }}
                    ></div>
                  </>
                )}
                {item.type === "folder" && (
                  <div
                    style={{
                      ...itemIconBackgroundStyle,
                      ...folderIconBgStyle,
                    }}
                  >
                    <FolderItemIcon style={itemIconStyle} />
                  </div>
                )}
                {item.type === "file" && (
                  <div
                    style={{
                      ...itemIconBackgroundStyle,
                      ...fileIconBgStyle,
                    }}
                  >
                    <FileItemIcon style={itemIconStyle} />
                  </div>
                )}
              </div>

              {/* Text Content Section */}
              <div style={itemDetailsStyle}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div style={itemNameStyle}>{item.name}</div>
                  {item.type === FolderModel.type && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#737373",
                        backgroundColor: "#f2f2f2",
                        padding: "0 5px 0",
                        margin: "0 5px 0",
                        borderRadius: "6px",
                      }}
                    >
                      {item.fileCount} Files
                    </span>
                  )}
                </div>

                <div style={itemMetaStyle}>
                  {item.type === UserModel.type &&
                    `Active ${getDateTime(item.lastSeen)}`}
                  {item.type === FolderModel.type &&
                    `in ${item.path} • ${getDateTime(item.lastEdited)}`}
                  {item.type === FileModel.type &&
                    `in ${item.path} • ${getDateTime(item.lastEdited)}`}
                  {item.type === ChatModel.type &&
                    `${item.lastMessage} • ${getDateTime(
                      item.lastMessageTime
                    )}`}
                </div>
              </div>
              {hoveredId === item.id && <ItemOptions />}
            </div>
          ))}

          {/* Placeholder/Loading Skeleton */}
          {(filteredData || []).length === 0 && <ShimmerEffect />}
        </div>
      </div>
    </div>
  );
};

export default App;

// Inline styles
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  padding: "1rem",
  backgroundColor: "#f5f5f5",
  fontFamily: "Inter, sans-serif",
  minWidth: "100vw",
  cursor: "none",
};

const cardStyle = {
  width: "100%",
  maxWidth: "50rem",
  backgroundColor: "#ffffff",
  borderRadius: "1.5rem",
  // padding: "1.5rem",
  boxShadow:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  border: "1px solid #e5e5e5",
  color: "#171717",
};

const searchContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1.5rem",
  padding: "1.5rem 1.5rem 0",
};

const searchInputStyle = {
  width: "100%",
  padding: "0.75rem 0 0.75rem 2.5rem",
  // backgroundColor: "#f5f5f5",
  color: "#171717",
  borderRadius: "1rem",
  border: "none",
  outline: "none",
  transition: "all 0.2s ease-in-out",
  fontSize: 42,
  cursor: "none",
};

const searchIconStyle = {
  position: "absolute",
  // left: "0.75rem",
  color: "#a3a3a3",
  width: "1.25rem",
  height: "1.25rem",
};

const clearBtnStyle = {
  position: "absolute",
  right: "0.75rem",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#171717",
  fontWeight: "500",
  fontSize: 24,
  transition: "color 0.2s ease-in-out",
  textDecoration: "underline",
  outline: "none",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // paddingBottom: "0.75rem",
  marginBottom: "1.5rem",
  borderBottom: "1.8px solid #e5e5e5",
  position: "relative",
  padding: "0 1.5rem 0",
};

const tabsStyle = {
  display: "flex",
  gap: "1rem",
};

const tabStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingBottom: "0.75rem",
  transition: "all 0.3s ease-in-out",
  color: "#737373",
  zIndex: 1,
  bottom: 0,
  cursor: "none",
};

const tabActiveStyle = {
  color: "#171717",
  fontWeight: "600",
  borderBottom: "2px solid #171717",
};

const tabIconStyle = {
  width: "1.25rem",
  height: "1.25rem",
  color: "#f70474",
};

const tabCountStyle = {
  color: "#a3a3a3",
  fontSize: "0.75rem",
  fontWeight: "600",
  backgroundColor: "#f2f2f2",
  padding: "1px 4px 1px",
  borderRadius: "4px",
};

const settingsIconStyle = {
  width: "1.5rem",
  height: "1.5rem",
  transition: "transform 0.3s ease-in-out",
};

const resultsListStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "0 0 1.5rem",
};

const itemIconContainerStyle = {
  position: "relative",
  width: "2.5rem",
  height: "2.5rem",
  flexShrink: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.75rem",
  // padding: 24,
};

const itemIconStyle = {
  width: "0.75rem",
  height: "0.75rem",
};

const personImageStyle = {
  width: "100%",
  height: "100%",
  // borderRadius: "9999px",
  objectFit: "cover",
};

const statusDotStyle = {
  position: "absolute",
  bottom: "0",
  right: "0",
  width: "0.75rem",
  height: "0.75rem",
  borderRadius: "9999px",
  border: "2px solid white",
};

const statusActiveStyle = {
  backgroundColor: "#22c55e",
};

const statusInactiveStyle = {
  backgroundColor: "#facc15",
};

const itemIconBackgroundStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "0.75rem",
};

const fileIconBgStyle = {
  backgroundColor: "#f5f5f5",
  color: "#737373",
};

const folderIconBgStyle = {
  backgroundColor: "#f5f5f5",
  color: "#737373",
};

const itemDetailsStyle = {
  flex: "1",
};

const itemNameStyle = {
  fontWeight: "600",
  fontSize: "0.875rem",
  color: "#171717",
};

const itemMetaStyle = {
  fontSize: "0.75rem",
  color: "#737373",
};
