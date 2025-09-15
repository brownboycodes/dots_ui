function ItemOptions() {
  const iconLinkStyle = {
    width: "18px",
    height: "18px",
    stroke: "#6b7280",
    fill: "none",
  };

  const optionTextStyle = {
    fontSize: "0.875rem",
    color: "#6b7280",
  };

  const LinkIcon = () => (
    <svg
      style={iconLinkStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  );

  const NewTabIcon = () => (
    <svg
      style={iconLinkStyle}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <path d="M15 3h6v6"></path>
      <path d="M10 14L21 3"></path>
    </svg>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginLeft: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          cursor: "none",
        }}
      >
        <LinkIcon />
        <span style={optionTextStyle}>Link</span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          cursor: "none",
        }}
      >
        <NewTabIcon />
        <span style={optionTextStyle}>New Tab</span>
      </div>
    </div>
  );
}

export default ItemOptions;
