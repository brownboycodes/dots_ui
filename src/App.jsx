import React, { useState } from "react";
import "./App.css";
import ItemOptions from "./components/ItemOptions";
import { useAppContext } from "./context/AppContext";
import ShimmerEffect from "./components/ShimmerLoader";
import Cursor from "./components/Cursor";
import ListItem from "./components/ListItem";
import TabBar from "./components/TabBar";
import SearchBar from "./components/SearchBar";

const App = () => {
  // Get data and state from context
  const { searchQuery, filteredData, loading, searching } = useAppContext();

  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  const handleMouseEnter = (id) => {
    setHoveredId(id);
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
        <SearchBar />

        <div
          style={{
            maxHeight: searchQuery.trim().length > 0 ? "fit-content" : "0",
            opacity: searchQuery.trim().length > 0 ? "1" : "0",
            transition: "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
            overflow: "hidden",
          }}
          className="w-full flex flex-col items-center gap-4"
        >
          {/* Tabs and Settings */}
          {searchQuery.trim().length > 0 && <TabBar />}

          {/* Results List */}
          {searchQuery.trim().length > 0 && (
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
                      index != filteredData.length - 1
                        ? "2px solid #f1f1f1"
                        : null,
                    backgroundColor:
                      hoveredId === item.id ? "#f5f5f5" : "transparent",
                  }}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <ListItem item={item} />
                  {hoveredId === item.id && <ItemOptions />}
                </div>
              ))}

              {/* Placeholder/Loading Skeleton */}
              {((filteredData || []).length === 0 || loading || searching) && (
                <>
                  <div>
                    {[...Array(3)].map((e, index) => (
                      <ShimmerEffect key={index} />
                    ))}
                  </div>
                </>
              )}
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

const resultsListStyle = {
  display: "flex",
  flexDirection: "column",
  padding: "0 0 1.5rem",
};
