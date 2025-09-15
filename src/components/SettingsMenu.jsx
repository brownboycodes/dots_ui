import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import SettingsIcon from "../assets/images/settings-icon.svg?react";

function SettingsMenu() {
  // Get data and state from context
  const { tabs, setTabs } = useAppContext();

  const tabIconStyle = {
    width: "1.25rem",
    height: "1.25rem",
  };

  const settingsIconStyle = {
    width: "1.5rem",
    height: "1.5rem",
    transition: "transform 0.3s ease-in-out",
  };

  // State to control the visibility of the popup overlay.
  const [showOverlay, setShowOverlay] = useState(false);
  // Ref for the popup element to handle clicks outside of it.
  const popupRef = useRef(null);

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

  return (
    <>
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
    </>
  );
}

export default SettingsMenu;
