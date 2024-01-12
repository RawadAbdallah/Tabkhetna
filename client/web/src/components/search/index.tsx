import search_icon from '../../assets/images/search_icon.svg'
import './search.css'

const Search: React.FC = () => {
  return <div className='search-wrapper'>
    <img src={search_icon} alt="Search: " />
    <input type="text" id='search' name="search" placeholder='Search for recipes, cookmates and cuisines'/>
  </div>
}

export default Search