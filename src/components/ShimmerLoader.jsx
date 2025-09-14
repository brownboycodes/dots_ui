import React from "react";

const ShimmerEffect = () => {
  const skeletonLoaderStyle = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.75rem 1rem",
    borderRadius: "0.75rem",
    backgroundColor: "#ffffff",
  };

  const skeletonIconStyle = {
    width: "2.5rem",
    height: "2.5rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "0.75rem",
  };

  const skeletonLinesContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const skeletonLineStyle = {
    height: "0.75rem",
    backgroundColor: "#e5e7eb",
    borderRadius: "0.25rem",
  };

  const skeletonShortStyle = {
    width: "66.666667%",
  };

  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
      <div style={skeletonLoaderStyle}>
        <div style={skeletonIconStyle}></div>
        <div style={skeletonLinesContainerStyle}>
          <div style={skeletonLineStyle}></div>
          <div style={{ ...skeletonLineStyle, ...skeletonShortStyle }}></div>
        </div>
      </div>
    </>
  );
};

export default ShimmerEffect;
