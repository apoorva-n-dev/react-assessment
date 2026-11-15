
interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({
  search,
  onSearchChange
}: SearchBarProps) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search employee by name..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}
