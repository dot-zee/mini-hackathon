import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);

  const handleChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <div className="search-form">
      <input
        className="search-input outline-1 rounded-full"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;