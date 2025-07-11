import { Globe, Hexagon, Link2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveStyle = (path) => {
    return currentPath === path
      ? "border-l-[3px] border-btn bg-search-bg-hover text-white"
      : "hover:bg-search-bg";
  };

  return (
    <div className="flex flex-col h-full w-12 bg-search-bg-hover border-r border-gray-700/30">
      <Link to="/rest">
        <IconButton
          name="Rest"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/rest"
          )}`}>
          <Link2 size={17} />
        </IconButton>
      </Link>

      <Link to="/graphql">
        <IconButton
          name="GraphQL"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/graphql"
          )}`}>
          <Hexagon size={17} />
        </IconButton>
      </Link>

      <Link to="/realtime">
        <IconButton
          name="Realtime"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/realtime"
          )}`}>
          <Globe size={17} />
        </IconButton>
      </Link>

      <IconButton
        name="Settings"
        direction="right"
        height="flex justify-center items-center h-[46px] w-full hover:bg-search-bg">
        <Settings size={17} />
      </IconButton>
    </div>
  );
};

export default Sidebar;
