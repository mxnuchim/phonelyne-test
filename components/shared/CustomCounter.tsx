import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

type CounterProps = {
  initialCount?: number;
  onCountChange?: (count: number) => void;
};

const Counter: React.FC<CounterProps> = ({
  initialCount = 1,
  onCountChange,
}) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 1));

  useEffect(() => {
    if (onCountChange) {
      onCountChange(count);
    }
  }, [count, onCountChange]);

  return (
    <div className="flex items-center space-x-4 border border-gray-200 rounded-[10px] overflow-hidden">
      <button
        onClick={decrement}
        className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200"
        aria-label="Decrease count"
      >
        <Minus size={20} color="#000" />
      </button>

      <span className="text-base font-medium text-black">{count}</span>

      <button
        onClick={increment}
        className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200"
        aria-label="Increase count"
      >
        <Plus size={20} color="#000" />
      </button>
    </div>
  );
};

export default Counter;
