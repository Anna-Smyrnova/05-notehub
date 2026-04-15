import css from "./SearchBox.module.css"


interface SearchBoxProps {
    searchQuery: string;
    onSearch: (nextSerchQuery: string) => void;
}


export default function SearchBox ({searchQuery, onSearch}: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <input
  className={css.input}
  type="text"
  placeholder="Search notes"
  value={searchQuery}
  onChange={handleChange}
 />
    )
}