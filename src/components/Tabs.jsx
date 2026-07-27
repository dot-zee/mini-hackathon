import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";
import { resetTab } from "../redux/features/collectionSlice";
import { fetchMedia } from "../redux/features/collectionSlice";

const Tabs = () => {
  const dispatch = useDispatch();
  const { activeTab, query } = useSelector((state) => state.search);

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    dispatch(setActiveTab(tab));
    dispatch(resetTab(tab));

    if (query.trim()) {
      dispatch(fetchMedia({ query, type: tab, page: 1 }));
    }
  };

  return (
    <div className="tabs">
      {["photos", "videos", "gifs"].map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => handleTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;