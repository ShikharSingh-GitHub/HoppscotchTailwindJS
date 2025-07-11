import { BookOpen, Clock, Folder, Package } from "lucide-react";
import IconButton from "../IconButton/IconButton";

const GraphQLSidebar = ({ activePanel, setActivePanel }) => {
  const getActiveStyle = (panel) => {
    return activePanel === panel
      ? "tab active vertical bg-search-bg text-white"
      : "tab vertical text-gray-400 hover:text-white hover:bg-search-bg-hover";
  };

  const tabs = [
    {
      id: "documentation",
      name: "Documentation",
      icon: <BookOpen size={19} />,
    },
    {
      id: "schema",
      name: "Schema",
      icon: <Package size={19} />,
    },
    {
      id: "collections",
      name: "Collections",
      icon: <Folder size={19} />,
    },
    {
      id: "history",
      name: "History",
      icon: <Clock size={19} />,
    },
  ];

  return (
    <div className="tabs relative border-gray-700/30 border-r overflow-x-auto flex-shrink-0 bg-primary z-10 h-full">
      <div className="flex flex-1">
        <div className="flex flex-1 justify-between flex-col">
          <div className="flex flex-1 flex-col space-y-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePanel(tab.id)}
                className={`${getActiveStyle(
                  tab.id
                )} inline-flex items-center justify-center p-3 rounded transition-colors`}
                aria-label={tab.name}
                role="button">
                {tab.icon}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-2 justify-end"></div>
          <div className="flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default GraphQLSidebar;
