import React from "react";

const LogoIcon = ({ size = 40, variant = "light" }) => {
  // Light variant: beige/sand color (for dark backgrounds)
  // Dark variant: navy color (for light backgrounds)
  const strokeColor = variant === "light" ? "#D4B896" : "#0B1F3B";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Penrose / Impossible Triangle */}
      <g strokeLinejoin="round" strokeLinecap="round">
        {/* Back face - bottom left to top */}
        <path
          d="M24 95 L60 15 L72 38"
          stroke={strokeColor}
          strokeWidth="7"
          fill="none"
        />
        {/* Back face - bottom right */}
        <path
          d="M96 95 L60 15"
          stroke={strokeColor}
          strokeWidth="7"
          fill="none"
          opacity="0.4"
        />
        {/* Front face - right side */}
        <path
          d="M96 95 L72 38 L48 82"
          stroke={strokeColor}
          strokeWidth="7"
          fill="none"
        />
        {/* Front face - bottom */}
        <path
          d="M24 95 L96 95"
          stroke={strokeColor}
          strokeWidth="7"
          fill="none"
        />
        {/* Inner edge creating illusion */}
        <path
          d="M42 78 L60 45 L78 78 Z"
          stroke={strokeColor}
          strokeWidth="4"
          fill="none"
        />
        {/* Overlap connectors for impossible effect */}
        <path
          d="M34 95 L48 82"
          stroke={strokeColor}
          strokeWidth="5"
          fill="none"
        />
      </g>
    </svg>
  );
};

export { LogoIcon };
export default LogoIcon;
