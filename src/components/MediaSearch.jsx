import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import ResultGrid from "./ResultGrid";
import "./MediaSearch.css";
import { useNavigate } from "react-router";

function MediaSearch() {
  const navigate = useNavigate();

  return (
    <div className="app h-screen">
      <button onClick={() => navigate("/")} className="tab cursor-pointer">
        Go back
      </button>
      <h1 className="title uppercase">Media Search</h1>
      <SearchBar />
      <Tabs />
      <ResultGrid />
    </div>
  );
}

export default MediaSearch;
