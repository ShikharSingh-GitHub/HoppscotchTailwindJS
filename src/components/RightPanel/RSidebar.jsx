import { Clock3, Code, Folder, Layers, Share2 } from "lucide-react";
import IconButton from "../IconButton/IconButton";

const RSidebar = ({ activePanel, setActivePanel }) => {
  const getActiveStyle = (panel) => {
    return activePanel === panel ? "text-btn" : "";
  };

  return (
    <>
      <IconButton name="Collections" direction="left" height="h-10">
        <button onClick={() => setActivePanel("collections")}>
          <Folder size={17} className={getActiveStyle("collections")} />
        </button>
      </IconButton>

      <IconButton name="Environments" direction="left" height="h-10">
        <button onClick={() => setActivePanel("environments")}>
          <Layers size={17} className={getActiveStyle("environments")} />
        </button>
      </IconButton>

      <IconButton name="History" direction="left" height="h-10">
        <button onClick={() => setActivePanel("history")}>
          <Clock3 size={17} className={getActiveStyle("history")} />
        </button>
      </IconButton>

      <IconButton name="Shared Requests" direction="left" height="h-10">
        <button onClick={() => setActivePanel("shared")}>
          <Share2 size={17} className={getActiveStyle("shared")} />
        </button>
      </IconButton>

      <IconButton name="Generated Code" direction="left" height="h-10">
        <button onClick={() => setActivePanel("code")}>
          <Code size={17} className={getActiveStyle("code")} />
        </button>
      </IconButton>
    </>
  );
};

export default RSidebar;
