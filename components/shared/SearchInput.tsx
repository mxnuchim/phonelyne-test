import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  containerClassName?: string;
  showSuggestions?: boolean;
  suggestions?: { name: string; flag: string }[];
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  showSuggestions,
  suggestions,
  containerClassName = "",
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = React.useState<
    { name: string; flag: string }[]
  >([]);

  React.useEffect(() => {
    if (value && showSuggestions) {
      const filtered = suggestions?.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered || []);
    } else {
      setFilteredSuggestions([]);
    }
  }, [value, suggestions, showSuggestions]);

  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center ${containerClassName}`}
    >
      {/* Wrapper to position the icon */}
      <div className="relative w-full max-w-[596px]">
        {/* Magnifying Glass Icon */}
        <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-12 pl-10 pr-4 py-2 bg-gray-800 border-2 border-gray800 text-white rounded-full outline-none focus:bg-white focus:text-black ${className}`}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute w-full top-full bg-gray800 border border-gray800 rounded-[20px] mt-2 max-h-60 max-w-[596px] overflow-auto z-10">
          {filteredSuggestions.map((country, index) => (
            <li
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer"
            >
              <span className="mr-2">{country.flag}</span>
              <span className="text-white font-medium">{country.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
