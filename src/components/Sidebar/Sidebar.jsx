import { Globe, Link2, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import IconButton from "../IconButton/IconButton";

// Custom GraphQL Icon Component
const GraphQLIcon = ({ size = 15 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 21 24"
    className="svg-icons">
    <path
      fill="currentColor"
      d="M12.731 2.751 17.666 5.6a2.138 2.138 0 1 1 2.07 3.548l-.015.003v5.7a2.14 2.14 0 1 1-2.098 3.502l-.002-.002-4.905 2.832a2.14 2.14 0 1 1-4.079.054l-.004.015-4.941-2.844a2.14 2.14 0 1 1-2.067-3.556l.015-.003V9.15a2.14 2.14 0 1 1 1.58-3.926l-.01-.005c.184.106.342.231.479.376l.001.001 4.938-2.85a2.14 2.14 0 1 1 4.096.021l.004-.015zm-.515.877a.766.766 0 0 1-.057.057l-.001.001 6.461 11.19c.026-.009.056-.016.082-.023V9.146a2.14 2.14 0 0 1-1.555-2.603l-.003.015.019-.072zm-3.015.059-.06-.06-4.946 2.852A2.137 2.137 0 0 1 2.749 9.12l-.015.004-.076.021v5.708l.084.023 6.461-11.19zm2.076.507a2.164 2.164 0 0 1-1.207-.004l.015.004-6.46 11.189c.286.276.496.629.597 1.026l.003.015h12.911c.102-.413.313-.768.599-1.043l.001-.001L11.28 4.194zm.986 16.227 4.917-2.838a1.748 1.748 0 0 1-.038-.142H4.222l-.021.083 4.939 2.852c.39-.403.936-.653 1.54-.653.626 0 1.189.268 1.581.696l.001.002z"
    />
  </svg>
);

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
          <Link2 size={15} />
        </IconButton>
      </Link>

      <Link to="/graphql">
        <IconButton
          name="GraphQL"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/graphql"
          )}`}>
          <GraphQLIcon size={15} />
        </IconButton>
      </Link>

      <Link to="/realtime">
        <IconButton
          name="Realtime"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/realtime"
          )}`}>
          <Globe size={15} />
        </IconButton>
      </Link>

      <Link to="/settings">
        <IconButton
          name="Settings"
          direction="right"
          height={`flex justify-center items-center h-[46px] w-full ${getActiveStyle(
            "/settings"
          )}`}>
          <Settings size={15} />
        </IconButton>
      </Link>
    </div>
  );
};

export default Sidebar;
