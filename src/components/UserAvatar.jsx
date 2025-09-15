import { useState } from "react";

function UserAvatar({ src, name, style }) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Extract first two letters of the user's name
  const initials = name ? name.slice(0, 2).toUpperCase() : "";

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e5e7eb", // gray background for placeholder
        color: "#171717",
        fontWeight: "600",
        fontSize: "1rem",
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {!hasError && (
        <img
          src={src}
          alt={name}
          style={{ ...style, display: isLoaded ? "block" : "none" }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      {(!isLoaded || hasError) && <span>{initials}</span>}
    </div>
  );
}

export default UserAvatar;
