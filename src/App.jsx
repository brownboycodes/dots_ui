import React, { useState, useEffect, useRef } from "react";
// import { ReactComponent as YourSvg } from "./assets/images/image-svgrepo-com.svg";
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

const mockData = [
  {
    id: 1,
    type: "person",
    name: "Randall Johnsson",
    status: "Active now",
    image: "https://placehold.co/40x40/f43f5e/ffffff?text=RJ",
    isActive: true,
  },
  {
    id: 2,
    type: "folder",
    name: "Random Michal Folder",
    count: 12,
    lastEdited: "Edited 12m ago",
  },
  {
    id: 3,
    type: "file",
    name: "crative_file_frandkies.jpg",
    location: "in Photos/Assets",
    lastEdited: "Edited 12m ago",
  },
  {
    id: 4,
    type: "person",
    name: "Kristinge Karand",
    status: "Active 2d ago",
    image: "https://placehold.co/40x40/4f46e5/ffffff?text=KK",
    isActive: false,
  },
  {
    id: 5,
    type: "file",
    name: "files_krande_michelle.avi",
    location: "in Videos",
    lastEdited: "Added 12m ago",
  },
];

// Main App component
const App = () => {
  const [searchTerm, setSearchTerm] = useState("Rand");
  const [activeTab, setActiveTab] = useState("all");
  const [filteredResults, setFilteredResults] = useState([]);

  // Tabs data
  const tabs = [
    { name: "All", key: "all" },
    { name: "Files", key: "files", icon: AttachmentIcon },
    { name: "People", key: "people", icon: PersonIcon },
    { name: "Chats", key: "chats", icon: ChatIcon },
    { name: "Lists", key: "lists", icon: ListIcon },
  ];

  // Logic to filter the mock data
  useEffect(() => {
    const filterData = () => {
      let tempResults = mockData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (activeTab === "files") {
        tempResults = tempResults.filter((item) => item.type == "file");
      } else if (activeTab === "people") {
        tempResults = tempResults.filter((item) => item.type === "person");
      }

      setFilteredResults(tempResults);
    };

    filterData();
  }, [searchTerm, activeTab]);

  // State to control the visibility of the popup overlay.
  const [showOverlay, setShowOverlay] = useState(false);
  // Ref for the popup element to handle clicks outside of it.
  const popupRef = useRef(null);

  const handleToggleOverlay = () => {
    setShowOverlay(!showOverlay);
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

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Search Bar */}
        <div style={searchContainerStyle}>
          <SearchIcon style={searchIconStyle} />
          <input
            type="text"
            style={searchInputStyle}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.trim().length == 0 ? (
            <QuickAccess />
          ) : (
            <button onClick={() => setSearchTerm("")} style={clearBtnStyle}>
              Clear
            </button>
          )}
        </div>

        {/* Tabs and Settings */}
        <div style={headerStyle}>
          <div style={tabsStyle}>
            {tabs.map((tab) => (
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
                <span style={tabCountStyle}>
                  {
                    filteredResults.filter(
                      (item) =>
                        tab.key === "all" ||
                        (tab.key === "files" && item.type !== "person") ||
                        (tab.key === "people" && item.type === "person")
                    ).length
                  }
                </span>
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
                  {tabs.map((tab) => (
                    <div className="popup-item">
                      <div className="popup-item-label">
                        {tab.icon && <tab.icon style={tabIconStyle} />}
                        <span>{tab.name}</span>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
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
          {filteredResults.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                // borderRadius: "0.75rem",
                transition: "background-color 0.2s ease-in-out",
                cursor: "pointer",
                borderBottom:
                  index != filteredResults.length - 1
                    ? "2px solid #f1f1f1"
                    : null,
                backgroundColor:
                  hoveredId === item.id ? "#f5f5f5" : "transparent",
              }}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Profile/File Icon Section */}
              <div style={itemIconContainerStyle}>
                {item.type === "person" && (
                  <>
                    <img
                      src={item.image}
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
                    style={{ ...itemIconBackgroundStyle, ...folderIconBgStyle }}
                  >
                    <FolderItemIcon style={itemIconStyle} />
                  </div>
                )}
                {item.type === "file" && (
                  <div
                    style={{ ...itemIconBackgroundStyle, ...fileIconBgStyle }}
                  >
                    <FileItemIcon style={itemIconStyle} />
                  </div>
                )}
              </div>

              {/* Text Content Section */}
              <div style={itemDetailsStyle}>
                <div style={itemNameStyle}>{item.name}</div>
                <div style={itemMetaStyle}>
                  {item.type === "person" && item.status}
                  {item.type === "folder" && `${item.count} Files`}
                  {item.type === "file" &&
                    `${item.location} • ${item.lastEdited}`}
                </div>
              </div>
              {hoveredId === item.id && <ItemOptions />}
            </div>
          ))}

          {/* Placeholder/Loading Skeleton */}
          {filteredResults.length === 0 && (
            <div style={skeletonLoaderStyle}>
              <div style={skeletonLineStyle}></div>
              <div
                style={{ ...skeletonLineStyle, ...skeletonShortStyle }}
              ></div>
            </div>
          )}
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
};

const cardStyle = {
  width: "100%",
  maxWidth: "40rem",
  backgroundColor: "#ffffff",
  borderRadius: "1.5rem",
  padding: "1.5rem",
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
};

const searchInputStyle = {
  width: "100%",
  padding: "0.75rem 1rem 0.75rem 2.5rem",
  // backgroundColor: "#f5f5f5",
  color: "#171717",
  borderRadius: "1rem",
  border: "none",
  outline: "none",
  transition: "all 0.2s ease-in-out",
  fontSize: 42,
};

const searchIconStyle = {
  position: "absolute",
  left: "0.75rem",
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
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  // paddingBottom: "0.75rem",
  marginBottom: "1.5rem",
  borderBottom: "2px solid #e5e5e5",
  position: "relative",
};

const tabsStyle = {
  display: "flex",
  gap: "1rem",
};

const tabStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  cursor: "pointer",
  paddingBottom: "0.75rem",
  transition: "all 0.3s ease-in-out",
  color: "#737373",
  zIndex: 1,
  bottom: 0,
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
  fontWeight: "normal",
  fontSize: "0.75rem",
};

const settingsIconStyle = {
  width: "1.5rem",
  height: "1.5rem",
  transition: "transform 0.3s ease-in-out",
};

const resultsListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
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
  borderRadius: "9999px",
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
  backgroundColor: "#e0f2fe",
  color: "#0ea5e9",
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

const skeletonLoaderStyle = {
  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "0.75rem 1rem",
  borderRadius: "0.75rem",
};

const skeletonLineStyle = {
  height: "2.5rem",
  backgroundColor: "#f5f5f5",
  borderRadius: "0.75rem",
};

const skeletonShortStyle = {
  width: "66.666667%",
};
