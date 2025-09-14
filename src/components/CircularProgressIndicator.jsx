import React from "react";

const CircularProgressIndicator = ({
  size = 40,
  strokeWidth = 4,
  color = "#737373",
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <style>
        {`
          .continuous-spinner {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          className="continuous-spinner"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
};

export default CircularProgressIndicator;
