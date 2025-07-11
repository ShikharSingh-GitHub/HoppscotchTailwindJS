import { Share2, Code, Folder, Layers, Clock3 } from "lucide-react";
import IconButton from "../IconButton/IconButton";

const RSidebar = () => {
  return (
    <>
      <IconButton name="Collections" direction="left" height="h-10">
        <Folder size={17} className="text-btn" />
      </IconButton>

      <IconButton name="Environments" direction="left" height="h-10">
        <Layers size={17} />
      </IconButton>

      <IconButton name="History" direction="left" height="h-10">
        <Clock3 size={17} />
      </IconButton>

      <IconButton name="Shared Requests" direction="left" height="h-10">
        <Share2 size={17} />
      </IconButton>

      <IconButton name="Generated Code" direction="left" height="h-10">
        <Code size={17} />
      </IconButton>
    </>
  );
};

export default RSidebar;
