import { useAppContext } from "../context/AppContext";
import AnimatedCounter from "../components/AnimatedCounter";
import SettingsMenu from "./SettingsMenu";
import styles from "../styles/TabBar.module.css";

function TabBar() {
  // Get data and state from context
  const { activeTab, setActiveTab, getCount, tabs } = useAppContext();

  return (
    <div className={styles.header}>
      <div className={styles.tabs}>
        {tabs
          .filter((tab) => tab.active)
          .map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`${styles.tab} ${
                activeTab === tab.key ? styles.tabActive : ""
              }`}
            >
              {tab.icon && <tab.icon className={styles.tabIcon} />}
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
