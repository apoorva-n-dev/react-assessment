
import { useRef } from "react";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({
  search,
  onSearchChange
}: SearchBarProps) {

  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        ref={searchRef}
        type="text"
        placeholder="Search employees..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        autoFocus
      />

      <button onClick={() => searchRef.current?.focus()}>
        Focus Search
      </button>
    </div>
  );
}
