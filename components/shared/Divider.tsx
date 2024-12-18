import React from "react";

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => (
  <div className={`w-full border-t border-whiteBg my-4 ${className}`} />
);

export default Divider;
