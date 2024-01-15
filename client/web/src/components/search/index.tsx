import search_icon from "@images/search_icon.svg";
import "./search.css";

type Props = {
    placeholder?: string,
}

const Search: React.FC<Props> = ({placeholder}) => {
    return (
        <div className="search-wrapper">
            <img src={search_icon} alt="Search: " />
            <input
                type="text"
                id="search"
                name="search"
                placeholder={placeholder ? placeholder : "Search"}
            />
        </div>
    );
};

export default Search;
