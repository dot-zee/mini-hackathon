import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMedia, nextPage } from "../redux/features/collectionSlice";
import SkeletonGrid from "./SkeletonGrid";

const ResultGrid = () => {
  const dispatch = useDispatch();

  const { items, status, page } = useSelector((state) => state.collection);
  const { query, activeTab } = useSelector((state) => state.search);

  const currentItems = items[activeTab];
  const currentStatus = status[activeTab];
  const currentPage = page[activeTab];

  // Debounced fetch
  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      dispatch(fetchMedia({ query, type: activeTab, page: currentPage }));
    }, 500);

    return () => clearTimeout(timer);
  }, [query, activeTab, currentPage, dispatch]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!currentItems.length) return;
      if (currentStatus === "loading") return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (scrollTop + windowHeight >= fullHeight - 150) {
        dispatch(nextPage(activeTab));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentItems.length, currentStatus, activeTab, dispatch]);

  if (currentStatus === "loading" && currentItems.length === 0)
    return <SkeletonGrid />;

  return (
    <div className="grid">
      {currentItems.map((item) => (
        <div key={item.id} className="card">
          {/* PHOTOS */}
          {activeTab === "photos" && (
            <a href={item.links.html} target="_blank" rel="noopener noreferrer">
              <img src={item.urls.small} alt={item.alt_description || ""} />
            </a>
          )}

          {/* VIDEOS */}
          {activeTab === "videos" && (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="video-preview"
              >
                <source
                  src={
                    item.video_files.find(
                      (file) => file.file_type === "video/mp4",
                    )?.link
                  }
                  type="video/mp4"
                />
              </video>
            </a>
          )}

          {/* GIFS */}
          {activeTab === "gifs" && (
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  item.images?.fixed_width?.url || item.images?.original?.url
                }
                alt={item.title || ""}
              />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultGrid;