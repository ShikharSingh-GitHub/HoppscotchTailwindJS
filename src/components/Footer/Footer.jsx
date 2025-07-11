import Tippy from "@tippyjs/react";
import {
  Columns2,
  PanelRight,
  ShieldCheck,
  Zap,
  Share2,
  PanelLeftOpen,
  CircleHelp,
} from "lucide-react";
import IconButton from "../IconButton/IconButton";

const Footer = () => {
  return (
    <>
    <div className="flex justify-between items-center py-2 px-3 border-t border-zinc-800/80">
      <div className="flex items-center space-x-4">
        <IconButton name="Expand Sidebar" direction="top">
          <PanelRight size={17} />
        </IconButton>

        <IconButton name="Interceptor" direction="top">
          <ShieldCheck size={17} />
        </IconButton>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-white text-xs font-semibold me-10">
          <CircleHelp size={17} />
          <span>Help & feedback</span>
        </button>

        <Tippy
          content={
            <span className="text-[10px] font-semibold">
              Shorts
              <span className="bg-gray-400 rounded-[2px] mx-1 px-1">ctrl</span>
              <span className="bg-gray-400 rounded-[2px] px-1">/</span>
            </span>
          }
          placement="top"
          theme="light"
        >
          <button className="text-gray-400 hover:text-white">
            <Zap size={17} />
          </button>
        </Tippy>

        <IconButton name="Share" direction="top">
          <Share2 size={17} />
        </IconButton>

        <IconButton name="Horizontal Layout" direction="top">
          <Columns2 size={17} />
        </IconButton>

        <IconButton name="Collapse Sidebar" direction="top">
          <PanelLeftOpen size={17} />
        </IconButton>
      </div>
    </div>
    </>
  );
};

export default Footer;
