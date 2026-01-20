import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="https://i.imgur.com/nnsT7o4.png"
      alt="Xenlix AI Logo"
      className={className}
    />
  );
};
