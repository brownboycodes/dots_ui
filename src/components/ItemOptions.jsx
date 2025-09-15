import { useEffect, useRef, useState } from "react";

function ItemOptions() {
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    top: 0,
    left: 0,
  });
  const buttonRef = useRef(null);

  // Effect to hide the toast after a few seconds
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        setToast({ ...toast, isVisible: false });
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  // Function to show the toast
  const showToast = (message) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setToast({
        isVisible: true,
        message: message,
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }
  };

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
    <>
      <style>{`
        @keyframes toast-in {
          from {
            transform: translate(-50%, 0) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -100%) scale(1);
            opacity: 1;
          }
        }
        .animate-toast-in {
          animation: toast-in 0.3s ease-out forwards;
        }
      `}</style>
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
          ref={buttonRef}
          onClick={() => showToast("Link copied!")}
        >
          <LinkIcon />
          <span style={optionTextStyle}>Link</span>
          {toast.isVisible && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-[calc(100%+1rem)] px-6 py-3 bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-out animate-toast-in z-50 whitespace-nowrap overflow-hidden"
              style={{
                top: toast.top,
                left: toast.left,
                minWidth: "200px", // Set a minimum width
                maxWidth: "300px", // Set a maximum width
                textOverflow: "ellipsis",
              }}
            >
              {toast.message}
            </div>
          )}
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
    </>
  );
}

export default ItemOptions;
