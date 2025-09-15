import { useAppContext } from "../context/AppContext";
import CircularProgressIndicator from "./CircularProgressIndicator";
import QuickAccess from "./QuickAccess";

function SearchBar() {
  const { searchQuery, setSearchQuery, loading } = useAppContext();

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
    width: 36,
    height: 36,
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

  return (
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
  );
}

export default SearchBar;
