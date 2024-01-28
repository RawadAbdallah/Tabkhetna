import search_icon from "@images/search_icon.svg";
import "./search.css";
import {useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    placeholder?: string,
}

const Search: React.FC<Props> = ({placeholder}) => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [searchError, setSearchError] = useState<string>("")
    const navigate = useNavigate()
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        if(searchQuery.length > 3){
            setSearchError("")
        }
    }
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            if(searchQuery.length < 3){
                setSearchError("Search query should be at least 3 characters")
            } else {
                navigate(`/search?q=${searchQuery}`)
                
            }
        }         
    }

    return (
       <div className="search-container flex flex-column gap-2">   
       {searchError && <div className="search-error">
        {searchError}
       </div>}
        <div className="search-wrapper">
            <img src={search_icon} alt="Search: " />
            <input
                type="text"
                id="search"
                name="search"
                placeholder={placeholder ? placeholder : "Search"}
                onChange={handleSearchChange}
                onKeyDown={handleSearch}
            />
        </div>
       </div>
    );
};

export default Search;
