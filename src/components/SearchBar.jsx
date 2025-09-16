import { useAppContext } from "../context/AppContext";
import CircularProgressIndicator from "./CircularProgressIndicator";
import QuickAccess from "./QuickAccess";
import styles from "../styles/SearchBar.module.css";

function SearchBar() {
  const { searchQuery, setSearchQuery, searching, filteredData } =
    useAppContext();

  const SearchIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#a3a3a3"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${styles.searchIcon}`}
      height={48}
      width={48}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );

  return (
    <div className={styles.searchContainer}>
      {searching || filteredData.length === 0 ? (
        <CircularProgressIndicator />
      ) : (
        <SearchIcon />
      )}
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Searching is easier"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery.trim().length === 0 ? (
        <QuickAccess />
      ) : (
        <button onClick={() => setSearchQuery("")} className={styles.clearBtn}>
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
