import { ChevronRight, Plus, CircleHelp, FolderDown } from "lucide-react";
import IconButton from "../IconButton/IconButton";
import RSidebar from "./RSidebar";

const RightPanel = () => {
  return (
    <div className="flex h-full w-full">
      <div className="w-13 flex flex-col items-center pt-1 border-r border-zinc-800/80">
        <RSidebar />
      </div>

      <div className="w-full">
        <div className="flex items-center border-b border-zinc-800/80 pb-2 pt-2 px-3">
          <p className="text-[11px] text-stone-500">Personal Workspace</p>
          <p>
            <ChevronRight size={14} className="text-stone-500 mx-3 mt-[1px]" />
          </p>
          <p className="text-[11px] text-stone-500">Collections</p>
        </div>

        <p className="text-[12px] text-stone-500 font-semibold border-b border-zinc-800/80 py-2 px-3">
          Search
        </p>

        <div className="flex justify-between px-3 py-2 border-b border-zinc-800/80">
          <button className="flex space-x-3 items-center text-gray-500 hover:text-white">
            <Plus size={18} />
            <span className="text-xs font-semibold">New</span>
          </button>

          <div className="flex space-x-4">
            <IconButton name="Wiki" direction="top">
              <CircleHelp size={18} />
            </IconButton>

            <IconButton name="Import / Export" direction="top">
              <FolderDown size={18} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
