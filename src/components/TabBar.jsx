import { useAppContext } from "../context/AppContext";
import AnimatedCounter from "../components/AnimatedCounter";
import SettingsMenu from "./SettingsMenu";

function TabBar() {
  // Get data and state from context
  const { activeTab, setActiveTab, getCount, tabs } = useAppContext();

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
  };

  return (
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
              <AnimatedCounter value={getCount(tab.key)} duration={1000} />
            </div>
          ))}
      </div>
      <SettingsMenu />
    </div>
  );
}

export default TabBar;
