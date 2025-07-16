import { useRef, useState } from "react";
import Response from "../components/LeftPanel/Response";
import RouteHeader from "../components/LeftPanel/RouteHeader";
import RightPanel from "../components/RightPanel/RightPanel";

function RestPanel() {
  const [leftWidth, setLeftWidth] = useState(70); // Match GraphQL default
  const [topHeight, setTopHeight] = useState(60);
  const containerRef = useRef(null);
  const verticalContainerRef = useRef(null);
  const isResizing = useRef(false);
  const isVerticalResizing = useRef(false);

  // Match GraphQL constraints
  const MIN_WIDTH = 40;
  const MAX_WIDTH = 80;
  const MIN_HEIGHT = 30;
  const MAX_HEIGHT = 80;

  // Horizontal resizing functions - Fixed with proper event handling
  const startResizing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleResize = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    e.preventDefault();
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width;
    let newLeftWidth =
      ((e.clientX - containerRect.left) / containerWidth) * 100;
    if (newLeftWidth < MIN_WIDTH) newLeftWidth = MIN_WIDTH;
    if (newLeftWidth > MAX_WIDTH) newLeftWidth = MAX_WIDTH;
    setLeftWidth(newLeftWidth);
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  // Vertical resizing functions
  const startVerticalResizing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isVerticalResizing.current = true;
    document.addEventListener("mousemove", handleVerticalResize);
    document.addEventListener("mouseup", stopVerticalResizing);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  };

  const handleVerticalResize = (e) => {
    if (!isVerticalResizing.current || !verticalContainerRef.current) return;
    e.preventDefault();
    const containerRect = verticalContainerRef.current.getBoundingClientRect();
    const containerHeight = containerRect.height;
    let newTopHeight =
      ((e.clientY - containerRect.top) / containerHeight) * 100;
    if (newTopHeight < MIN_HEIGHT) newTopHeight = MIN_HEIGHT;
    if (newTopHeight > MAX_HEIGHT) newTopHeight = MAX_HEIGHT;
    setTopHeight(newTopHeight);
  };

  const stopVerticalResizing = () => {
    isVerticalResizing.current = false;
    document.removeEventListener("mousemove", handleVerticalResize);
    document.removeEventListener("mouseup", stopVerticalResizing);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  return (
    <div
      className="flex w-full h-full border-l border-gray-700/30"
      ref={containerRef}>
      {/* Left Panel with Vertical Split */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="flex flex-col"
        ref={verticalContainerRef}>
        {/* Top Section - RouteHeader */}
        <div style={{ height: `${topHeight}%` }} className="overflow-hidden">
          <RouteHeader />
        </div>

        {/* Vertical Drag Handle - More subtle like original */}
        <div
          onMouseDown={startVerticalResizing}
          className="h-[2px] bg-zinc-700/50 cursor-row-resize hover:bg-btn transition-all duration-200 hover:h-[4px] flex-shrink-0"
        />

        {/* Bottom Section - Response */}
        <div
          style={{ height: `${100 - topHeight}%` }}
          className="overflow-hidden">
          <div className="h-full p-4">
            <Response />
          </div>
        </div>
      </div>

      {/* Horizontal Drag Handle - Much more subtle and properly positioned */}
      <div
        onMouseDown={startResizing}
        className="w-[2px] cursor-col-resize bg-zinc-700/50 hover:bg-btn transition-all duration-200 hover:w-[4px] flex-shrink-0 relative z-50"
        style={{
          minWidth: "2px",
          maxWidth: "4px",
        }}
      />

      {/* Right Panel */}
      <div style={{ width: `${100 - leftWidth}%` }}>
        <RightPanel />
      </div>
    </div>
  );
}

export default RestPanel;
